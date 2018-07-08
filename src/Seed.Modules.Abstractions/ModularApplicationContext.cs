﻿using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.FileProviders.Embedded;
using Seed.Modules.Manifest;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;

namespace Seed.Modules
{
    public static class ModularApplicationContext
    {
        private static Application _application;
        private static readonly IDictionary<string, Module> _modules = new Dictionary<string, Module>();
        private static readonly object _synLock = new object();

        public static Application GetApplication(this IHostingEnvironment environment)
        {
            if (_application == null)
            {
                lock (_synLock)
                {
                    if (_application == null)
                    {
                        _application = new Application(environment);
                    }
                }
            }

            return _application;
        }

        public static Module GetModule(this IHostingEnvironment environment, string name)
        {
            if (!_modules.TryGetValue(name, out var module))
            {
                if (!environment.GetApplication().ModuleNames.Contains(name, StringComparer.Ordinal))
                {
                    return new Module(string.Empty);
                }

                lock (_synLock)
                {
                    if (!_modules.TryGetValue(name, out module))
                    {
                        _modules[name] = module = new Module(name, name == environment.ApplicationName);
                    }
                }
            }

            return module;
        }
    }

    public class Application
    {
        public const string ModulesPath = ".Modules";
        public const string ModuleName = "Application";
        public static string ModulesRoot = ModulesPath + "/";

        public Application(IHostingEnvironment environment)
        {
            Name = environment.ApplicationName;
            Path = environment.ContentRootPath;
            Root = Path + '/';

            Assembly = Assembly.Load(new AssemblyName(Name));

            var moduleNames = Assembly.GetCustomAttributes<ModuleNameAttribute>()
                .Select(m => m.Name).ToList();

            moduleNames.Add(Name);
            ModuleNames = moduleNames;

            ModulePath = ModulesRoot + Name;
            ModuleRoot = ModulePath + '/';
        }

        public string Name { get; }
        public string Path { get; }
        public string Root { get; }
        public Assembly Assembly { get; }
        public IEnumerable<string> ModuleNames { get; }
        public string ModulePath { get; }
        public string ModuleRoot { get; }
    }

    public class Module
    {
        public const string WebRootPath = "wwwroot";
        public static string WebRoot = WebRootPath + "/";

        private readonly string _baseNamespace;
        private readonly DateTimeOffset _lastModified;
        private readonly IDictionary<string, IFileInfo> _fileInfos = new Dictionary<string, IFileInfo>();

        public Module(string name, bool isApplication = false)
        {
            if (!string.IsNullOrWhiteSpace(name))
            {
                Name = name;
                SubPath = Application.ModulesRoot + Name;
                Root = SubPath + '/';

                Assembly = Assembly.Load(new AssemblyName(name));

                Assets = Assembly.GetCustomAttributes<ModuleAssetAttribute>()
                    .Select(a => new Asset(a.Asset)).ToArray();

                AssetPaths = Assets.Select(a => a.ModuleAssetPath).ToArray();

                var moduleInfos = Assembly.GetCustomAttributes<ModuleAttribute>();

                ModuleInfo =
                    moduleInfos.Where(f => !(f is ModuleMarkerAttribute)).FirstOrDefault() ??
                    moduleInfos.Where(f => f is ModuleMarkerAttribute).FirstOrDefault() ??
                    new ModuleAttribute { Name = Name };

                var features = Assembly.GetCustomAttributes<Manifest.FeatureAttribute>()
                    .Where(f => !(f is ModuleAttribute)).ToList();

                ModuleInfo.Id = Name;

                if (isApplication)
                {
                    ModuleInfo.Name = Application.ModuleName;
                    ModuleInfo.Description = "Provides core features defined at the application level";
                    ModuleInfo.Priority = int.MinValue.ToString();
                    ModuleInfo.Category = "Application";
                    ModuleInfo.DefaultTenantOnly = true;

                    if (features.Any())
                    {
                        features.Insert(0, new Manifest.FeatureAttribute()
                        {
                            Id = ModuleInfo.Id,
                            Name = ModuleInfo.Name,
                            Description = ModuleInfo.Description,
                            Priority = ModuleInfo.Priority,
                            Category = ModuleInfo.Category
                        });
                    }
                }

                ModuleInfo.Features.AddRange(features);
            }
            else
            {
                Name = Root = SubPath = String.Empty;
                Assets = Enumerable.Empty<Asset>();
                AssetPaths = Enumerable.Empty<string>();
                ModuleInfo = new ModuleAttribute();
            }

            _baseNamespace = Name + '.';
            _lastModified = DateTimeOffset.UtcNow;

            if (!string.IsNullOrEmpty(Assembly?.Location))
            {
                try
                {
                    _lastModified = File.GetLastWriteTimeUtc(Assembly.Location);
                }
                catch (PathTooLongException)
                {
                }
                catch (UnauthorizedAccessException)
                {
                }
            }
        }

        public string Name { get; }
        public string Root { get; }
        public string SubPath { get; }
        public Assembly Assembly { get; }
        public IEnumerable<Asset> Assets { get; }
        public IEnumerable<string> AssetPaths { get; }
        public ModuleAttribute ModuleInfo { get; }

        public IFileInfo GetFileInfo(string subpath)
        {
            if (!_fileInfos.TryGetValue(subpath, out var fileInfo))
            {
                if (!AssetPaths.Contains(Root + subpath, StringComparer.Ordinal))
                {
                    return new NotFoundFileInfo(subpath);
                }

                lock (_fileInfos)
                {
                    if (!_fileInfos.TryGetValue(subpath, out fileInfo))
                    {
                        var resourcePath = _baseNamespace + subpath.Replace('/', '>');
                        var fileName = Path.GetFileName(subpath);

                        if (Assembly.GetManifestResourceInfo(resourcePath) == null)
                        {
                            return new NotFoundFileInfo(fileName);
                        }

                        _fileInfos[subpath] = fileInfo = new EmbeddedResourceFileInfo(
                            Assembly, resourcePath, fileName, _lastModified);
                    }
                }
            }

            return fileInfo;
        }
    }

    public class Asset
    {
        public Asset(string asset)
        {
            asset = asset.Replace('\\', '/');
            var index = asset.IndexOf('|');

            if (index == -1)
            {
                ModuleAssetPath = string.Empty;
                ProjectAssetPath = string.Empty;
            }
            else
            {
                ModuleAssetPath = asset.Substring(0, index);
                ProjectAssetPath = asset.Substring(index + 1);
            }
        }

        public string ModuleAssetPath { get; }
        public string ProjectAssetPath { get; }
    }
}
