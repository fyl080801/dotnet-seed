using Seed.Plugin.Abstractions.Feature;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Seed.Plugin.Abstractions
{
    public interface IPluginManager
    {
        IEnumerable<IFeatureInfo> GetFeatures();
        IEnumerable<IFeatureInfo> GetFeatures(string[] featureIdsToLoad);
        Task<IEnumerable<FeatureEntry>> LoadFeaturesAsync();
        Task<IEnumerable<FeatureEntry>> LoadFeaturesAsync(string[] featureIdsToLoad);
    }
}
