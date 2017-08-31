using Seed.Plugin.Abstractions;
using Seed.Plugin.Abstractions.Feature;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Seed.Plugin
{
    public class PluginManager : IPluginManager
    {
        public IEnumerable<IFeatureInfo> GetFeatures()
        {
            return new IFeatureInfo[0];
        }

        public IEnumerable<IFeatureInfo> GetFeatures(string[] featureIdsToLoad)
        {
            return new IFeatureInfo[0];
        }

        public Task<IEnumerable<FeatureEntry>> LoadFeaturesAsync()
        {
            return Task.FromResult<IEnumerable<FeatureEntry>>(new FeatureEntry[0]);
        }

        public Task<IEnumerable<FeatureEntry>> LoadFeaturesAsync(string[] featureIdsToLoad)
        {
            return Task.FromResult<IEnumerable<FeatureEntry>>(new FeatureEntry[0]);
        }
    }
}
