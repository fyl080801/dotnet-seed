using Seed.Plugins.Feature;
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

        Task<IEnumerable<IPluginInfo>> GetPluginsAsync();

        Task<IEnumerable<FeatureEntry>> GetFeaturesAsync();

        Task<IEnumerable<FeatureEntry>> GetFeaturesAsync(string[] featureIds);
    }
}