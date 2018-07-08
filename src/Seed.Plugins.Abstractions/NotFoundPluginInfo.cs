using System.Collections.Generic;
using System.Linq;
using Seed.Plugins.Features;
using Seed.Plugins.Manifests;

namespace Seed.Plugins
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
