using System.IO;
using System.Collections.Generic;
using System.Linq;
using Seed.Environment.Plugins.Features;
using Seed.Environment.Plugins.Manifests;

namespace Seed.Environment.Plugins
{
    public class InternalPluginInfo : IPluginInfo
    {
        public InternalPluginInfo(string subPath)
        {
            Id = Path.GetFileName(subPath);
            SubPath = subPath;
            Manifest = new NotFoundManifestInfo(subPath);
            Features = Enumerable.Empty<IFeatureInfo>();
        }

        public string Id { get; }

        public string SubPath { get; }

        public IManifestInfo Manifest { get; }

        public IEnumerable<IFeatureInfo> Features { get; }

        public bool Exists => Manifest.Exists;
    }
}