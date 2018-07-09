﻿using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.FileProviders.Physical;
using Microsoft.Extensions.Primitives;
using Seed.Modules;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace Seed.Mvc
{
    public class ModuleProjectRazorFileProvider : IFileProvider
    {
        private static Dictionary<string, string> _paths;
        private static object _synLock = new object();

        public ModuleProjectRazorFileProvider(IHostingEnvironment environment)
        {
            if (_paths != null)
            {
                return;
            }

            lock (_synLock)
            {
                if (_paths == null)
                {
                    var assets = new List<Asset>();
                    var application = environment.GetApplication();

                    foreach (var name in application.ModuleNames)
                    {
                        var module = environment.GetModule(name);

                        if (module.Assembly == null || Path.GetDirectoryName(module.Assembly.Location)
                            != Path.GetDirectoryName(application.Assembly.Location))
                        {
                            continue;
                        }

                        assets.AddRange(module.Assets.Where(a => a.ModuleAssetPath
                            .EndsWith(".cshtml", StringComparison.Ordinal)));
                    }

                    _paths = assets.ToDictionary(a => a.ModuleAssetPath, a => a.ProjectAssetPath);
                }
            }
        }

        public IDirectoryContents GetDirectoryContents(string subpath)
        {
            return NotFoundDirectoryContents.Singleton;
        }

        public IFileInfo GetFileInfo(string subpath)
        {
            if (subpath == null)
            {
                return new NotFoundFileInfo(subpath);
            }

            var path = NormalizePath(subpath);

            if (_paths.TryGetValue(path, out var projectAssetPath))
            {
                return new PhysicalFileInfo(new FileInfo(projectAssetPath));
            }

            return new NotFoundFileInfo(subpath);
        }

        public IChangeToken Watch(string filter)
        {
            if (filter == null)
            {
                return NullChangeToken.Singleton;
            }

            var path = NormalizePath(filter);

            if (_paths.TryGetValue(path, out var projectAssetPath))
            {
                return new PollingFileChangeToken(new FileInfo(projectAssetPath));
            }

            return NullChangeToken.Singleton;
        }

        private string NormalizePath(string path)
        {
            return path.Replace('\\', '/').Trim('/');
        }
    }
}
