using SeedCore.Addon.Manifests;
using System.Collections.Generic;

namespace SeedCore.Addon.Features
{
    public interface IFeaturesProvider
    {
        IEnumerable<IFeatureInfo> GetFeatures(
            IExtensionInfo extensionInfo,
            IManifestInfo manifestInfo);
    }
}
