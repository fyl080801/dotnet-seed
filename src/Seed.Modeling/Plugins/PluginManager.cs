using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Seed.Plugins.Descriptors;
using Seed.Plugins.Feature;
using Seed.Plugins.Loader;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace Seed.Plugins
{
    public class PluginManager : IPluginManager
    {
        static object _locker = new object();

        bool _initialized = false;

        readonly PluginExpanderOptions _pluginExpanderOptions;
        readonly DescriptorOptions _descriptorOptions;
        readonly IHostingEnvironment _hostingEnvironment;
        readonly IPluginProvider _pluginProvider;
        readonly IDescriptorProvider _descriptorProvider;
        readonly IPluginLoader _pluginLoader;
        readonly ITypeFeatureProvider _typeFeatureProvider;//ok
        readonly IEnumerable<IPluginDependencyStrategy> _pluginDependencyStrategies;
        readonly IEnumerable<IPluginPriorityStrategy> _pluginPriorityStrategies;

        private IDictionary<string, PluginEntry> _plugins;
        private IDictionary<string, FeatureEntry> _features;
        private IFeatureInfo[] _orderedFeatures;

        public PluginManager(
            IOptions<PluginExpanderOptions> pluginExpanderOptionsAccessor,
            IOptions<DescriptorOptions> descriptorOptionsAccessor,
            IHostingEnvironment hostingEnvironment,
            IPluginProvider pluginProvider,
            IDescriptorProvider descriptorProvider,
            IPluginLoader pluginLoader,
            ITypeFeatureProvider typeFeatureProvider,
            IEnumerable<IPluginDependencyStrategy> pluginDependencyStrategies,
            IEnumerable<IPluginPriorityStrategy> pluginPriorityStrategies)
        {
            _pluginExpanderOptions = pluginExpanderOptionsAccessor.Value;
            _descriptorOptions = descriptorOptionsAccessor.Value;
            _hostingEnvironment = hostingEnvironment;
            _pluginProvider = pluginProvider;
            _descriptorProvider = descriptorProvider;
            _pluginLoader = pluginLoader;
            _typeFeatureProvider = typeFeatureProvider;
            _pluginDependencyStrategies = pluginDependencyStrategies;
            _pluginPriorityStrategies = pluginPriorityStrategies;
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
            ExecuteInitialized();

            PluginEntry plugin;
            if (_plugins.TryGetValue(id, out plugin))
            {
                return plugin.PluginInfo;
            }

            return new NullPluginInfo(id);
        }

        public IEnumerable<IPluginInfo> GetPlugins()
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<IPluginInfo>> GetPluginsAsync()
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// 
        /// </summary>
        private void ExecuteInitialized()
        {
            if (_initialized) return;
            lock (_locker)
            {
                if (_initialized) return;

                var plugins = GetCurrentPlugins();
                var loadedPlugins = new ConcurrentDictionary<string, PluginEntry>();
                Parallel.ForEach(plugins, (plugin) =>
                {
                    if (!plugin.Exists) return;

                    var entry = _pluginLoader.Load(plugin);

                    loadedPlugins.TryAdd(plugin.Id, entry);
                });

                var loadedFeatures = new Dictionary<string, FeatureEntry>();
                var typesInPlugin = loadedPlugins.SelectMany(plugin => plugin.Value.Exports
                    .Where(IsComponentType)
                    .Select(type => new
                    {
                        PluginEntry = plugin.Value,
                        Type = type
                    }))
                    .ToArray();
                var typesInFeature = typesInPlugin
                    .GroupBy(pluginType => GetFeatureNameForType(pluginType.Type, pluginType.PluginEntry.PluginInfo.Id))
                    .ToDictionary(group => group.Key, group => group.Select(g => g.Type).ToArray());

                foreach (var loadedPlugin in loadedPlugins)
                {
                    var plugin = loadedPlugin.Value;

                    foreach (var feature in plugin.PluginInfo.Features)
                    {
                        if (typesInFeature.TryGetValue(feature.Id, out var featureTypes))
                        {
                            featureTypes.ToList().ForEach(f => _typeFeatureProvider.TryAdd(f, feature));
                        }
                        else
                        {
                            featureTypes = Array.Empty<Type>();
                        }

                        loadedFeatures.Add(feature.Id, new CompiledFeatureEntry(feature, featureTypes));
                    }
                };

                _plugins = loadedPlugins;

                _features = loadedFeatures;
                _orderedFeatures = OrderFeatures(loadedFeatures.Values.Select(x => x.FeatureInfo));
                _initialized = true;
            }
        }

        private ICollection<IPluginInfo> GetCurrentPlugins()
        {
            var pathOptions = _pluginExpanderOptions.Options;
            var pluginSet = new HashSet<IPluginInfo>();

            if (pathOptions.Count <= 0) return pluginSet;

            foreach (var options in pathOptions)
            {
                foreach (var path in _hostingEnvironment.ContentRootFileProvider.GetDirectoryContents(options.Path).Where(e => e.IsDirectory))
                {
                    var descriptorsOption = _descriptorOptions.Options.FirstOrDefault(e => File.Exists(Path.Combine(path.PhysicalPath, e.DescriptorFileName)));

                    if (descriptorsOption == null) continue;

                    var descriptorPath = Path.Combine(options.Path, path.Name);
                    var descriptorFilePath = Path.Combine(descriptorPath, descriptorsOption.DescriptorFileName);
                    var configurationBuilder = _descriptorProvider.GetConfigurationBuilder(new ConfigurationBuilder(), descriptorFilePath);

                    if (configurationBuilder.Sources.Count <= 0) continue;

                    pluginSet.Add(_pluginProvider.GetPluginInfo(new DescriptorInfo(configurationBuilder.Build(), descriptorsOption.TypeName), descriptorPath));
                }
            }

            return pluginSet;
        }

        private bool IsComponentType(Type type)
        {
            var typeInfo = type.GetTypeInfo();
            return typeInfo.IsClass && typeInfo.IsPublic && !typeInfo.IsAbstract;
        }

        private string GetFeatureNameForType(Type type, string pluginId)
        {
            var attribute = type.GetTypeInfo().GetCustomAttributes<FeatureAttribute>(false).FirstOrDefault();

            return attribute?.FeatureName ?? pluginId;
        }

        private IFeatureInfo[] OrderFeatures(IEnumerable<IFeatureInfo> orders)
        {
            return orders
                .OrderBy(x => x.Id)
                .Distinct()
                .OrderByStrategies(HasDependency, GetPriority)
                .ToArray();
        }

        private bool HasDependency(IFeatureInfo source, IFeatureInfo objective)
        {
            return _pluginDependencyStrategies.Any(s => s.HasDependency(source, objective));
        }

        private int GetPriority(IFeatureInfo feature)
        {
            return _pluginPriorityStrategies.Sum(s => s.GetPriority(feature));
        }
    }
}