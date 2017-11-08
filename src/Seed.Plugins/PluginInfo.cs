using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.Extensions.FileProviders;
using Seed.Plugins.Descriptors;
using Seed.Plugins.Feature;

namespace Seed.Plugins
{
    public class PluginInfo : IPluginInfo
    {
        readonly string _id;
        readonly IFileInfo _fileInfo;
        readonly string _path;
        readonly IDescriptorInfo _descriptorInfo;
        readonly IEnumerable<IFeatureInfo> _features;

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

        public override bool Equals(object obj)
        {
            return ((IPluginInfo)obj).Id == this.Id;
        }

        public override int GetHashCode()
        {
            return this.Id.GetHashCode();
        }
    }
}
