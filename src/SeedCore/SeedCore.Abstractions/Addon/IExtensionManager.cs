using SeedCore.Addon.Features;
using SeedCore.Addon.Loaders;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SeedCore.Addon
{
    public interface IExtensionManager
    {
        IExtensionInfo GetExtension(string extensionId);
        IEnumerable<IExtensionInfo> GetExtensions();
        Task<ExtensionEntry> LoadExtensionAsync(IExtensionInfo extensionInfo);

        IEnumerable<IFeatureInfo> GetFeatures();
        IEnumerable<IFeatureInfo> GetFeatures(string[] featureIdsToLoad);
        IEnumerable<IFeatureInfo> GetFeatureDependencies(string featureId);
        IEnumerable<IFeatureInfo> GetDependentFeatures(string featureId);
        Task<IEnumerable<FeatureEntry>> LoadFeaturesAsync();
        Task<IEnumerable<FeatureEntry>> LoadFeaturesAsync(string[] featureIdsToLoad);
    }
}
