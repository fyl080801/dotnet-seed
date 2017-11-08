using Microsoft.Extensions.FileProviders;
using Seed.Plugins.Descriptors;
using Seed.Plugins.Feature;
using System.Collections.Generic;
using System.Linq;

namespace Seed.Plugins
{
    public class NullPluginInfo : IPluginInfo
    {
        readonly IEnumerable<IFeatureInfo> _featureInfos;
        readonly string _pluginId;
        readonly IFileInfo _fileInfo;
        readonly IDescriptorInfo _descriptorInfo;

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
