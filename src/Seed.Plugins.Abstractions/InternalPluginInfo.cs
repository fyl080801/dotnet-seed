using Microsoft.Extensions.FileProviders;
using Seed.Plugins.Descriptors;
using Seed.Plugins.Feature;
using System.Collections.Generic;
using System.Linq;

namespace Seed.Plugins
{
    public class InternalPluginInfo : IPluginInfo
    {
        readonly IFileInfo _fileInfo;
        readonly string _path;
        readonly IDescriptorInfo _descriptorInfo;
        readonly IEnumerable<IFeatureInfo> _features;

        public InternalPluginInfo(string path)
        {
            _path = path;
            _fileInfo = new NotFoundFileInfo(path);
            _descriptorInfo = new NullDescriptorInfo(path);
            _features = Enumerable.Empty<IFeatureInfo>();
        }

        public string Id => _fileInfo.Name;

        public IFileInfo PluginFileInfo => _fileInfo;

        public string Path => _path;

        public IDescriptorInfo Descriptor => _descriptorInfo;

        public IEnumerable<IFeatureInfo> Features => _features;

        public bool Exists => _fileInfo.Exists && _descriptorInfo.Exists;
    }
}
