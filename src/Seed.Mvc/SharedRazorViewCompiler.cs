using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc.Razor.Compilation;
using Microsoft.AspNetCore.Mvc.Razor.Internal;
using Microsoft.AspNetCore.Razor.Hosting;
using Microsoft.AspNetCore.Razor.Language;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.Emit;
using Microsoft.CodeAnalysis.Text;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Primitives;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Seed.Mvc
{
    public class SharedRazorViewCompiler : IViewCompiler
    {
        private readonly static object _cacheLock = new object();
        private readonly Dictionary<string, CompiledViewDescriptor> _precompiledViews;
        private readonly ConcurrentDictionary<string, string> _normalizedPathCache;
        private readonly IFileProvider _fileProvider;
        private readonly RazorProjectEngine _projectEngine;
        private readonly Action<RoslynCompilationContext> _compilationCallback;
        private readonly ILogger _logger;
        private readonly CSharpCompiler _csharpCompiler;
        private readonly static IMemoryCache _cache = new MemoryCache(new MemoryCacheOptions());

        public SharedRazorViewCompiler(
            IFileProvider fileProvider,
            RazorProjectEngine projectEngine,
            CSharpCompiler csharpCompiler,
            Action<RoslynCompilationContext> compilationCallback,
            IList<CompiledViewDescriptor> precompiledViews,
            ILogger logger)
        {
            if (precompiledViews == null)
            {
                throw new ArgumentNullException(nameof(precompiledViews));
            }

            _fileProvider = fileProvider ?? throw new ArgumentNullException(nameof(fileProvider));
            _projectEngine = projectEngine ?? throw new ArgumentNullException(nameof(projectEngine));
            _csharpCompiler = csharpCompiler ?? throw new ArgumentNullException(nameof(csharpCompiler));
            _compilationCallback = compilationCallback ?? throw new ArgumentNullException(nameof(compilationCallback));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));

            _normalizedPathCache = new ConcurrentDictionary<string, string>(StringComparer.Ordinal);

            _precompiledViews = new Dictionary<string, CompiledViewDescriptor>(
                precompiledViews.Count,
                StringComparer.OrdinalIgnoreCase);

            foreach (var precompiledView in precompiledViews)
            {
                logger.ViewCompilerLocatedCompiledView(precompiledView.RelativePath);

                if (!_precompiledViews.ContainsKey(precompiledView.RelativePath))
                {
                    _precompiledViews.Add(precompiledView.RelativePath, precompiledView);
                }
            }

            if (_precompiledViews.Count == 0)
            {
                logger.ViewCompilerNoCompiledViewsFound();
            }
        }

        /// <inheritdoc />
        public Task<CompiledViewDescriptor> CompileAsync(string relativePath)
        {
            if (relativePath == null)
            {
                throw new ArgumentNullException(nameof(relativePath));
            }

            if (_cache.TryGetValue(relativePath, out Task<CompiledViewDescriptor> cachedResult))
            {
                return cachedResult;
            }

            var normalizedPath = GetNormalizedPath(relativePath);
            if (_cache.TryGetValue(normalizedPath, out cachedResult))
            {
                return cachedResult;
            }

            cachedResult = OnCacheMiss(normalizedPath);
            return cachedResult;
        }

        private Task<CompiledViewDescriptor> OnCacheMiss(string normalizedPath)
        {
            ViewCompilerWorkItem item;
            TaskCompletionSource<CompiledViewDescriptor> taskSource;
            MemoryCacheEntryOptions cacheEntryOptions;

            lock (_cacheLock)
            {
                if (_cache.TryGetValue(normalizedPath, out Task<CompiledViewDescriptor> result))
                {
                    return result;
                }

                if (_precompiledViews.TryGetValue(normalizedPath, out var precompiledView))
                {
                    _logger.ViewCompilerLocatedCompiledViewForPath(normalizedPath);
                    item = CreatePrecompiledWorkItem(normalizedPath, precompiledView);
                }
                else
                {
                    item = CreateRuntimeCompilationWorkItem(normalizedPath);
                }

                cacheEntryOptions = new MemoryCacheEntryOptions();

                Debug.Assert(item.ExpirationTokens != null);
                for (var i = 0; i < item.ExpirationTokens.Count; i++)
                {
                    cacheEntryOptions.ExpirationTokens.Add(item.ExpirationTokens[i]);
                }

                taskSource = new TaskCompletionSource<CompiledViewDescriptor>();
                if (item.SupportsCompilation)
                {

                }
                else
                {
                    Debug.Assert(item.Descriptor != null);
                    taskSource.SetResult(item.Descriptor);
                }

                _cache.Set(normalizedPath, taskSource.Task, cacheEntryOptions);
            }

            if (item.SupportsCompilation)
            {
                Debug.Assert(taskSource != null);

                if (item.Descriptor?.Item != null &&
                    ChecksumValidator.IsItemValid(_projectEngine.FileSystem, item.Descriptor.Item))
                {
                    Debug.Assert(item.Descriptor != null);

                    taskSource.SetResult(item.Descriptor);
                    return taskSource.Task;
                }

                _logger.ViewCompilerInvalidingCompiledFile(item.NormalizedPath);
                try
                {
                    var descriptor = CompileAndEmit(normalizedPath);
                    descriptor.ExpirationTokens = cacheEntryOptions.ExpirationTokens;
                    taskSource.SetResult(descriptor);
                }
                catch (Exception ex)
                {
                    taskSource.SetException(ex);
                }
            }

            return taskSource.Task;
        }

        private ViewCompilerWorkItem CreatePrecompiledWorkItem(string normalizedPath, CompiledViewDescriptor precompiledView)
        {
            if (precompiledView.Item == null || !ChecksumValidator.IsRecompilationSupported(precompiledView.Item))
            {
                return new ViewCompilerWorkItem()
                {
                    SupportsCompilation = false,

                    ExpirationTokens = Array.Empty<IChangeToken>(),
                    Descriptor = precompiledView,
                };
            }

            var item = new ViewCompilerWorkItem()
            {
                SupportsCompilation = true,

                Descriptor = precompiledView,

                NormalizedPath = normalizedPath,
                ExpirationTokens = new List<IChangeToken>(),
            };

            var checksums = precompiledView.Item.GetChecksumMetadata();
            for (var i = 0; i < checksums.Count; i++)
            {
                item.ExpirationTokens.Add(_fileProvider.Watch(checksums[i].Identifier));
            }

            item.Descriptor = new CompiledViewDescriptor()
            {
                ExpirationTokens = item.ExpirationTokens,
                IsPrecompiled = true,
                Item = precompiledView.Item,
                RelativePath = precompiledView.RelativePath,
                ViewAttribute = precompiledView.ViewAttribute,
            };

            return item;
        }

        private ViewCompilerWorkItem CreateRuntimeCompilationWorkItem(string normalizedPath)
        {
            var expirationTokens = new List<IChangeToken>()
            {
                _fileProvider.Watch(normalizedPath),
            };

            var projectItem = _projectEngine.FileSystem.GetItem(normalizedPath);
            if (!projectItem.Exists)
            {
                _logger.ViewCompilerCouldNotFindFileAtPath(normalizedPath);

                return new ViewCompilerWorkItem()
                {
                    SupportsCompilation = false,

                    Descriptor = new CompiledViewDescriptor()
                    {
                        RelativePath = normalizedPath,
                        ExpirationTokens = expirationTokens,
                    },

                    ExpirationTokens = expirationTokens,
                };
            }

            _logger.ViewCompilerFoundFileToCompile(normalizedPath);

            var importFeature = _projectEngine.ProjectFeatures.OfType<IImportProjectFeature>().FirstOrDefault();

            var imports = importFeature?.GetImports(projectItem) ?? Enumerable.Empty<RazorProjectItem>();
            var physicalImports = imports.Where(import => import.FilePath != null);

            foreach (var physicalImport in physicalImports)
            {
                expirationTokens.Add(_fileProvider.Watch(physicalImport.FilePath));
            }

            return new ViewCompilerWorkItem()
            {
                SupportsCompilation = true,

                NormalizedPath = normalizedPath,
                ExpirationTokens = expirationTokens,
            };
        }

        protected virtual CompiledViewDescriptor CompileAndEmit(string relativePath)
        {
            var projectItem = _projectEngine.FileSystem.GetItem(relativePath);
            var codeDocument = _projectEngine.Process(projectItem);
            var cSharpDocument = codeDocument.GetCSharpDocument();

            if (cSharpDocument.Diagnostics.Count > 0)
            {
                throw CompilationFailedExceptionFactory.Create(
                    codeDocument,
                    cSharpDocument.Diagnostics);
            }

            var assembly = CompileAndEmit(codeDocument, cSharpDocument.GeneratedCode);

            var loader = new RazorCompiledItemLoader();
            var item = loader.LoadItems(assembly).SingleOrDefault();
            var attribute = assembly.GetCustomAttribute<RazorViewAttribute>();

            return new CompiledViewDescriptor(item, attribute);
        }

        internal Assembly CompileAndEmit(RazorCodeDocument codeDocument, string generatedCode)
        {
            _logger.GeneratedCodeToAssemblyCompilationStart(codeDocument.Source.FilePath);

            var startTimestamp = _logger.IsEnabled(LogLevel.Debug) ? Stopwatch.GetTimestamp() : 0;

            var assemblyName = Path.GetRandomFileName();
            var compilation = CreateCompilation(generatedCode, assemblyName);

            var emitOptions = _csharpCompiler.EmitOptions;
            var emitPdbFile = _csharpCompiler.EmitPdb && emitOptions.DebugInformationFormat != DebugInformationFormat.Embedded;

            using (var assemblyStream = new MemoryStream())
            using (var pdbStream = emitPdbFile ? new MemoryStream() : null)
            {
                var result = compilation.Emit(
                    assemblyStream,
                    pdbStream,
                    options: emitOptions);

                if (!result.Success)
                {
                    throw CompilationFailedExceptionFactory.Create(
                        codeDocument,
                        generatedCode,
                        assemblyName,
                        result.Diagnostics);
                }

                assemblyStream.Seek(0, SeekOrigin.Begin);
                pdbStream?.Seek(0, SeekOrigin.Begin);

                var assembly = Assembly.Load(assemblyStream.ToArray(), pdbStream?.ToArray());
                _logger.GeneratedCodeToAssemblyCompilationEnd(codeDocument.Source.FilePath, startTimestamp);

                return assembly;
            }
        }

        private CSharpCompilation CreateCompilation(string compilationContent, string assemblyName)
        {
            var sourceText = SourceText.From(compilationContent, Encoding.UTF8);
            var syntaxTree = _csharpCompiler.CreateSyntaxTree(sourceText).WithFilePath(assemblyName);
            var compilation = _csharpCompiler
                .CreateCompilation(assemblyName)
                .AddSyntaxTrees(syntaxTree);
            compilation = ExpressionRewriter.Rewrite(compilation);

            var compilationContext = new RoslynCompilationContext(compilation);
            _compilationCallback(compilationContext);
            compilation = compilationContext.Compilation;
            return compilation;
        }

        private string GetNormalizedPath(string relativePath)
        {
            Debug.Assert(relativePath != null);
            if (relativePath.Length == 0)
            {
                return relativePath;
            }

            if (!_normalizedPathCache.TryGetValue(relativePath, out var normalizedPath))
            {
                normalizedPath = ViewPath.NormalizePath(relativePath);
                _normalizedPathCache[relativePath] = normalizedPath;
            }

            return normalizedPath;
        }

        private class ViewCompilerWorkItem
        {
            public bool SupportsCompilation { get; set; }

            public string NormalizedPath { get; set; }

            public IList<IChangeToken> ExpirationTokens { get; set; }

            public CompiledViewDescriptor Descriptor { get; set; }
        }

        private static class CompilationFailedExceptionFactory
        {
            private const string CS0234 = nameof(CS0234);
            private const string CS0246 = nameof(CS0246);

            public static CompilationFailedException Create(
                RazorCodeDocument codeDocument,
                IEnumerable<RazorDiagnostic> diagnostics)
            {
                var messageGroups = diagnostics.GroupBy(
                    razorError => razorError.Span.FilePath ?? codeDocument.Source.FilePath,
                    StringComparer.Ordinal);

                var failures = new List<CompilationFailure>();
                foreach (var group in messageGroups)
                {
                    var filePath = group.Key;
                    var fileContent = ReadContent(codeDocument, filePath);
                    var compilationFailure = new CompilationFailure(
                        filePath,
                        fileContent,
                        compiledContent: string.Empty,
                        messages: group.Select(parserError => CreateDiagnosticMessage(parserError, filePath)));
                    failures.Add(compilationFailure);
                }

                return new CompilationFailedException(failures);
            }

            public static CompilationFailedException Create(
                RazorCodeDocument codeDocument,
                string compilationContent,
                string assemblyName,
                IEnumerable<Diagnostic> diagnostics)
            {
                var diagnosticGroups = diagnostics
                    .Where(diagnostic => diagnostic.IsWarningAsError || diagnostic.Severity == DiagnosticSeverity.Error)
                    .GroupBy(diagnostic => GetFilePath(codeDocument, diagnostic), StringComparer.Ordinal);

                var failures = new List<CompilationFailure>();
                foreach (var group in diagnosticGroups)
                {
                    var sourceFilePath = group.Key;
                    string sourceFileContent;
                    if (string.Equals(assemblyName, sourceFilePath, StringComparison.Ordinal))
                    {
                        sourceFileContent = compilationContent;
                        sourceFilePath = "Generated Code";
                    }
                    else
                    {
                        sourceFileContent = ReadContent(codeDocument, sourceFilePath);
                    }

                    string additionalMessage = null;
                    if (group.Any(g =>
                        string.Equals(CS0234, g.Id, StringComparison.OrdinalIgnoreCase) ||
                        string.Equals(CS0246, g.Id, StringComparison.OrdinalIgnoreCase)))
                    {
                        additionalMessage = "Dependency context not specified: Microsoft.NET.Sdk.Web, PreserveCompilationContext";
                    }

                    var compilationFailure = new CompilationFailure(
                        sourceFilePath,
                        sourceFileContent,
                        compilationContent,
                        group.Select(GetDiagnosticMessage),
                        additionalMessage);

                    failures.Add(compilationFailure);
                }

                return new CompilationFailedException(failures);
            }

            private static string ReadContent(RazorCodeDocument codeDocument, string filePath)
            {
                RazorSourceDocument sourceDocument;
                if (string.IsNullOrEmpty(filePath) || string.Equals(codeDocument.Source.FilePath, filePath, StringComparison.Ordinal))
                {
                    sourceDocument = codeDocument.Source;
                }
                else
                {
                    sourceDocument = codeDocument.Imports.FirstOrDefault(f => string.Equals(f.FilePath, filePath, StringComparison.Ordinal));
                }

                if (sourceDocument != null)
                {
                    var contentChars = new char[sourceDocument.Length];
                    sourceDocument.CopyTo(0, contentChars, 0, sourceDocument.Length);
                    return new string(contentChars);
                }

                return string.Empty;
            }

            private static DiagnosticMessage GetDiagnosticMessage(Diagnostic diagnostic)
            {
                var mappedLineSpan = diagnostic.Location.GetMappedLineSpan();
                return new DiagnosticMessage(
                    diagnostic.GetMessage(),
                    CSharpDiagnosticFormatter.Instance.Format(diagnostic),
                    mappedLineSpan.Path,
                    mappedLineSpan.StartLinePosition.Line + 1,
                    mappedLineSpan.StartLinePosition.Character + 1,
                    mappedLineSpan.EndLinePosition.Line + 1,
                    mappedLineSpan.EndLinePosition.Character + 1);
            }

            private static DiagnosticMessage CreateDiagnosticMessage(
                RazorDiagnostic razorDiagnostic,
                string filePath)
            {
                var sourceSpan = razorDiagnostic.Span;
                var message = razorDiagnostic.GetMessage();
                return new DiagnosticMessage(
                    message: message,
                    formattedMessage: razorDiagnostic.ToString(),
                    filePath: filePath,
                    startLine: sourceSpan.LineIndex + 1,
                    startColumn: sourceSpan.CharacterIndex,
                    endLine: sourceSpan.LineIndex + 1,
                    endColumn: sourceSpan.CharacterIndex + sourceSpan.Length);
            }

            private static string GetFilePath(RazorCodeDocument codeDocument, Diagnostic diagnostic)
            {
                if (diagnostic.Location == Location.None)
                {
                    return codeDocument.Source.FilePath;
                }

                return diagnostic.Location.GetMappedLineSpan().Path;
            }
        }
    }
}
