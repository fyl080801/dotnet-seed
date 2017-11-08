using Seed.Plugins.Feature;
using Seed.Plugins.Loader;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Seed.Plugins
{
    public interface IPluginManager
    {
        IPluginInfo GetPlugin(string id);

        IEnumerable<IPluginInfo> GetPlugins();

        IEnumerable<IFeatureInfo> GetFeatures();

        IEnumerable<IFeatureInfo> GetFeatures(string[] featureIds);

        IEnumerable<IFeatureInfo> GetFeaturesDependencies(string featureId);

        Task<PluginEntry> GetPluginEntryAsync(IPluginInfo plugin);

        Task<IEnumerable<FeatureEntry>> GetFeaturesAsync();

        Task<IEnumerable<FeatureEntry>> GetFeaturesAsync(string[] featureIds);
    }
}