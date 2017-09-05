using Microsoft.AspNetCore.Hosting;
using Seed.Plugins.Abstractions;
using Seed.Plugins.Abstractions.Feature;
using Seed.Plugins.Abstractions.Loader;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Seed.Plugins
{
    public class PluginManager : IPluginManager
    {
        static object _locker = new object();

        bool _initialized = false;

        readonly IHostingEnvironment _hostingEnvironment;
        readonly IPluginProvider _pluginProvider;
        readonly IPluginLoader _pluginLoader;
        readonly ITypeFeatureProvider _typeFeatureProvider;//ok
        readonly IEnumerable<IPluginDependencyStrategy> _pluginDependencyStrategies;

        public PluginManager(
            IHostingEnvironment hostingEnvironment,
            IPluginProvider pluginProvider,
            IPluginLoader pluginLoader,
            ITypeFeatureProvider typeFeatureProvider,
            IEnumerable<IPluginDependencyStrategy> pluginDependencyStrategies)
        {
            _hostingEnvironment = hostingEnvironment;
            _pluginProvider = pluginProvider;
            _pluginLoader = pluginLoader;
            _typeFeatureProvider = typeFeatureProvider;
            _pluginDependencyStrategies = pluginDependencyStrategies;
        }

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
