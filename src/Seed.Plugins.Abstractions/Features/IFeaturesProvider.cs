using System.Collections.Generic;

namespace Seed.Plugins.Features
{
    public interface IFeaturesProvider
    {
        IEnumerable<IFeatureInfo> GetFeatures(IPluginInfo pluginInfo, IManifestInfo manifestInfo);
    }
}
