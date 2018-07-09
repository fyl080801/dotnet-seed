using System.Collections.Generic;
using System.Linq;
using Seed.Environment.Plugins.Features;
using Seed.Environment.Plugins.Manifests;

namespace Seed.Environment.Plugins
{
    public class NotFoundPluginInfo : IPluginInfo
    {
        public NotFoundPluginInfo(string pluginId)
        {
            Features = Enumerable.Empty<IFeatureInfo>();
            Id = pluginId;
            Manifest = new NotFoundManifestInfo(pluginId);
        }

        public bool Exists => false;

        public IEnumerable<IFeatureInfo> Features { get; }

        public string Id { get; }

        public IManifestInfo Manifest { get; }

        public string SubPath => Id;
    }
}
