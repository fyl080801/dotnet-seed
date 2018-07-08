﻿using Seed.Plugins.Features;
using Seed.Plugins.Loaders;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace Seed.Plugins
{
    public interface IPluginManager
    {
        IPluginInfo GetPlugin(string pluginId);
        IEnumerable<IPluginInfo> GetPlugins();
        Task<PluginEntry> LoadPluginAsync(IPluginInfo pluginInfo);
        IEnumerable<IFeatureInfo> GetFeatures();
        IEnumerable<IFeatureInfo> GetFeatures(string[] featureIdsToLoad);
        IEnumerable<IFeatureInfo> GetFeatureDependencies(string featureId);
        IEnumerable<IFeatureInfo> GetDependentFeatures(string featureId);
        Task<IEnumerable<FeatureEntry>> LoadFeaturesAsync();
        Task<IEnumerable<FeatureEntry>> LoadFeaturesAsync(string[] featureIdsToLoad);
    }
}
