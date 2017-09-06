using Seed.Plugins.Abstractions;
using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.Extensions.FileProviders;
using Seed.Plugins.Abstractions.Feature;
using Seed.Plugins.Abstractions.Descriptors;

namespace Seed.Plugins
{
    public class PluginInfo : IPluginInfo
    {
        private readonly string _id;
        private readonly IFileInfo _fileInfo;
        private readonly string _path;
        private readonly IDescriptorInfo _descriptorInfo;
        private readonly IEnumerable<IFeatureInfo> _features;

        public PluginInfo(
            string id,
            IFileInfo fileInfo,
            string path,
            IDescriptorInfo descriptorInfo,
            Func<IDescriptorInfo, IPluginInfo, IEnumerable<IFeatureInfo>> features)
        {

            _id = id;
            _fileInfo = fileInfo;
            _path = path;
            _descriptorInfo = descriptorInfo;
            _features = features(descriptorInfo, this);
        }

        public string Id => _id;
        public IFileInfo PluginFileInfo => _fileInfo;
        public string Path => _path;
        public IDescriptorInfo Descriptor => _descriptorInfo;
        public IEnumerable<IFeatureInfo> Features => _features;
        public bool Exists => _fileInfo.Exists && _descriptorInfo.Exists;
    }
}
