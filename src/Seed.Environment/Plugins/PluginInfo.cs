using System;
using System.Collections.Generic;
using Seed.Environment.Plugins.Features;

namespace Seed.Environment.Plugins
{
    public class PluginInfo : IPluginInfo
    {
        public PluginInfo(
            string subPath,
            IManifestInfo manifestInfo,
            Func<IManifestInfo, IPluginInfo, IEnumerable<IFeatureInfo>> features)
        {
            SubPath = subPath;
            Manifest = manifestInfo;
            Features = features(manifestInfo, this);
        }

        public string Id => Manifest.ModuleInfo.Id;
        public string SubPath { get; }
        public IManifestInfo Manifest { get; }
        public IEnumerable<IFeatureInfo> Features { get; }
        public bool Exists => Manifest.Exists;
    }
}
