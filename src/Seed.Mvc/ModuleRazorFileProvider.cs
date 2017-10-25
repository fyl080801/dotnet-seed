using Microsoft.Extensions.FileProviders;
using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.Extensions.Primitives;
using System.IO;
using System.Linq;
using Microsoft.Extensions.FileProviders.Physical;
using Microsoft.AspNetCore.Mvc.Razor;

namespace Seed.Mvc
{
    public class ModuleRazorFileProvider : IFileProvider
    {
        private static Dictionary<string, string> _paths;
        private static string[] _pluginHosts;
        private static CompositeFileProvider _pagesFileProvider;
        private static object _synLock = new object();

        public ModuleRazorFileProvider(string rootPath, params string[] pluginHosts)
        {
            if (_paths != null)
            {
                return;
            }

            lock (_synLock)
            {
                if (_paths == null)
                {
                    _paths = new Dictionary<string, string>();

                    var replacePath = rootPath.Replace("\\", "/");
                    foreach (var pluginHost in pluginHosts)
                    {
                        Directory.GetFiles(Path.Combine(rootPath, pluginHost), "*" + RazorViewEngine.ViewExtension, SearchOption.AllDirectories)
                            .Select(x => x.Replace("\\", "/"))
                            .ToList()
                            .ForEach(x =>
                            {
                                _paths.Add(x.Replace(replacePath, string.Empty), x);
                            });
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
