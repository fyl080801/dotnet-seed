﻿using Microsoft.AspNetCore.Mvc.Razor;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.FileProviders.Physical;
using Microsoft.Extensions.Primitives;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace Seed.Mvc
{
    public class ModuleProjectRazorFileProvider : IFileProvider
    {
        private const string MappingFileFolder = "obj";
        private const string MappingFileName = "ModuleProjectRazorFiles.map";

        private static Dictionary<string, string> _paths;
        private static string[] _pluginHosts;
        private static CompositeFileProvider _pagesFileProvider;
        private static object _synLock = new object();

        public ModuleProjectRazorFileProvider(string rootPath, params string[] pluginHosts)
        {
            if (_paths != null)
            {
                return;
            }

            lock (_synLock)
            {
                if (_paths == null)
                {
                    var path = Path.Combine(rootPath, MappingFileFolder, MappingFileName);

                    if (File.Exists(path))
                    {
                        var paths = File.ReadAllLines(path)
                            .Select(x => x.Split(new[] { '|' }, StringSplitOptions.RemoveEmptyEntries))
                            .Where(x => x.Length == 2).ToDictionary(x => x[1].Replace('\\', '/'), x => x[0].Replace('\\', '/'));

                        _paths = new Dictionary<string, string>(paths);
                    }
                    else
                    {
                        _paths = new Dictionary<string, string>();
                    }
                }

                var roots = new HashSet<string>();

                foreach (var path in _paths.Values.Where(p => p.Contains("/Pages/") && !p.StartsWith("/Pages/")))
                {
                    roots.Add(path.Substring(0, path.IndexOf("/Pages/")));
                }

                if (roots.Count > 0)
                {
                    _pagesFileProvider = new CompositeFileProvider(roots.Select(r => new PhysicalFileProvider(r)));
                }
            }

            if (_pluginHosts == null)
            {
                lock (_synLock)
                {
                    if (_pluginHosts == null)
                    {
                        _pluginHosts = pluginHosts;
                    }
                }
            }
        }

        public IDirectoryContents GetDirectoryContents(string subpath)
        {
            return null;
        }

        public IFileInfo GetFileInfo(string subpath)
        {
            if (subpath != null && _paths.ContainsKey(subpath))
            {
                return new PhysicalFileInfo(new FileInfo(_paths[subpath]));
            }

            foreach (string pluginPath in _pluginHosts)
            {
                if (subpath.StartsWith("/" + pluginPath)) continue;
                var pluginFullPath = Path.Combine("/" + pluginPath, subpath.Replace("\\", "/").TrimStart('/')).Replace("\\", "/");
                if (subpath != null && _paths.ContainsKey(pluginFullPath))
                {
                    return new PhysicalFileInfo(new FileInfo(_paths[pluginFullPath]));
                }
            }
            return null;
        }

        public IChangeToken Watch(string filter)
        {
            if (filter != null && _paths.ContainsKey(filter))
            {
                return new PollingFileChangeToken(new FileInfo(_paths[filter]));
            }

            if (filter != null && _pagesFileProvider != null &&
                filter.IndexOf("/Pages/**/*" + RazorViewEngine.ViewExtension) != -1)
            {
                return _pagesFileProvider.Watch("/Pages/**/*" + RazorViewEngine.ViewExtension);
            }

            return null;
        }
    }
}
