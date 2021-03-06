﻿using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.FileProviders.Embedded;
using Seed.Modules.Manifest;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;

namespace Seed.Modules
{
    public class Module
    {
        public const string WebRootPath = "wwwroot";
        public static string WebRoot = WebRootPath + "/";

        private readonly string _baseNamespace;
        private readonly DateTimeOffset _lastModified;
        private readonly IDictionary<string, IFileInfo> _fileInfos = new Dictionary<string, IFileInfo>();

        public string Name { get; }

        public string Root { get; }

        public string SubPath { get; }

        public Assembly Assembly { get; }

        public IEnumerable<Asset> Assets { get; }

        public IEnumerable<string> AssetPaths { get; }

        public ModuleAttribute ModuleInfo { get; }

        public Module(INamedModule name, bool isApplication = false)
        {
            if (!string.IsNullOrWhiteSpace(name.Name))
            {
                Name = name.Name;
                SubPath = Application.ModulesRoot + Name;
                Root = SubPath + '/';

                Assembly = name.Assembly;

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
                    ModuleInfo.Description = "平台环境本身";
                    ModuleInfo.Priority = int.MinValue.ToString();
                    ModuleInfo.Category = "基础模块";
                    ModuleInfo.DefaultTenantOnly = true;
                    ModuleInfo.ManageDisallowed = true;

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

                        _fileInfos[subpath] = fileInfo = new EmbeddedResourceFileInfo(Assembly, resourcePath, fileName, _lastModified);
                    }
                }
            }

            return fileInfo;
        }
    }
}
