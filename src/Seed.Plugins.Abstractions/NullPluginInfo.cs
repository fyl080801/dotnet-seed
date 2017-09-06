using Seed.Plugins.Abstractions;
using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.Extensions.FileProviders;
using Seed.Plugins.Abstractions.Descriptors;
using Seed.Plugins.Abstractions.Feature;
using System.Linq;

namespace Seed.Plugins.Abstractions
{
    public class NullPluginInfo : IPluginInfo
    {
        private readonly IEnumerable<IFeatureInfo> _featureInfos;
        private readonly string _pluginId;
        private readonly IFileInfo _fileInfo;
        private readonly IDescriptorInfo _descriptorInfo;

        public NullPluginInfo(string extensionId)
        {
            _featureInfos = Enumerable.Empty<IFeatureInfo>();
            _pluginId = extensionId;
            _fileInfo = new NotFoundFileInfo(extensionId);
            _descriptorInfo = new NullDescriptorInfo(extensionId);
        }

        public bool Exists => false;

        public IFileInfo PluginFileInfo => _fileInfo;

        public IEnumerable<IFeatureInfo> Features => _featureInfos;

        public string Id => _pluginId;

        public IDescriptorInfo Descriptor => _descriptorInfo;

        public string Path => _pluginId;
    }
}
