using Seed.Plugins.Abstractions;
using Seed.Plugins.Abstractions.Feature;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Seed.Plugins
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

        public Task<IEnumerable<FeatureEntry>> GetFeaturesAsync()
        {
            return Task.FromResult<IEnumerable<FeatureEntry>>(new FeatureEntry[0]);
        }

        public Task<IEnumerable<FeatureEntry>> GetFeaturesAsync(string[] featureIdsToLoad)
        {
            return Task.FromResult<IEnumerable<FeatureEntry>>(new FeatureEntry[0]);
        }

        public IEnumerable<IFeatureInfo> GetFeaturesDependencies(string featureId)
        {
            throw new NotImplementedException();
        }

        public IPluginInfo GetPlugin(string id)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<IPluginInfo> GetPlugins()
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<IPluginInfo>> GetPluginsAsync()
        {
            throw new NotImplementedException();
        }
    }
}
