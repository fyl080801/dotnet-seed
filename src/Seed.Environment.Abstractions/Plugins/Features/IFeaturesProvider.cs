using System.Collections.Generic;

namespace Seed.Environment.Plugins.Features
{
    public interface IFeaturesProvider
    {
        IEnumerable<IFeatureInfo> GetFeatures(IPluginInfo pluginInfo, IManifestInfo manifestInfo);
    }
}
