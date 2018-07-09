using System.Collections.Generic;
using Seed.Environment.Plugins.Features;

namespace Seed.Environment.Plugins
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
