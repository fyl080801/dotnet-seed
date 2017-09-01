using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.Extensions.FileProviders;
using Seed.Plugins.Abstractions.Feature;
using System.Linq;

namespace Seed.Plugins.Abstractions
{
    public class InternalPluginInfo : IPluginInfo
    {
        private readonly IFileInfo _fileInfo;
        private readonly string _subPath;
        //private readonly IManifestInfo _manifestInfo;
        private readonly IEnumerable<IFeatureInfo> _features;

        public InternalPluginInfo(string subPath)
        {
            _subPath = subPath;

            _fileInfo = new NotFoundFileInfo(subPath);
            //_manifestInfo = new NotFoundManifestInfo(subPath);
            _features = Enumerable.Empty<IFeatureInfo>();
        }

        public string Id => _fileInfo.Name;
        public IFileInfo PluginFileInfo => _fileInfo;
        public string SubPath => _subPath;
        //public IManifestInfo Manifest => _manifestInfo;
        public IEnumerable<IFeatureInfo> Features => _features;
        public bool Exists => _fileInfo.Exists; //&& _manifestInfo.Exists;
    }
}
