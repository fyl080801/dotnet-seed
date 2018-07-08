using System.Collections.Generic;
using Seed.Plugins.Features;

namespace Seed.Plugins
{
    public interface IPluginInfo
    {
        string Id { get; }

        string SubPath { get; }

        bool Exists { get; }

        IManifestInfo Manifest { get; }

        IEnumerable<IFeatureInfo> Features { get; }
    }
}
