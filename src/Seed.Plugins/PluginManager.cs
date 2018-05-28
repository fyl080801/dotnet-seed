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
        readonly IEnumerable<IPluginLoader> _pluginLoaders;
        readonly ITypeFeatureProvider _typeFeatureProvider;//ok
        readonly IEnumerable<IPluginDependencyStrategy> _pluginDependencyStrategies;
        readonly IEnumerable<IPluginPriorityStrategy> _pluginPriorityStrategies;

        private ConcurrentDictionary<string, Lazy<IEnumerable<IFeatureInfo>>> _dependencyFeatures
            = new ConcurrentDictionary<string, Lazy<IEnumerable<IFeatureInfo>>>();

        private ConcurrentDictionary<string, Lazy<IEnumerable<IFeatureInfo>>> _featureDependencies
            = new ConcurrentDictionary<string, Lazy<IEnumerable<IFeatureInfo>>>();

        private IDictionary<string, PluginEntry> _plugins;
        private IDictionary<string, FeatureEntry> _features;
        private IFeatureInfo[] _orderedFeatures;

        public PluginManager(
            IOptions<PluginExpanderOptions> pluginExpanderOptionsAccessor,
            IOptions<DescriptorOptions> descriptorOptionsAccessor,
            IHostingEnvironment hostingEnvironment,
            IPluginProvider pluginProvider,
            IEnumerable<IPluginLoader> pluginLoaders,
            IDescriptorProvider descriptorProvider,
            ITypeFeatureProvider typeFeatureProvider,
            IEnumerable<IPluginDependencyStrategy> pluginDependencyStrategies,
            IEnumerable<IPluginPriorityStrategy> pluginPriorityStrategies)
        {
            _pluginExpanderOptions = pluginExpanderOptionsAccessor.Value;
            _descriptorOptions = descriptorOptionsAccessor.Value;
            _hostingEnvironment = hostingEnvironment;
            _pluginProvider = pluginProvider;
            _descriptorProvider = descriptorProvider;
            _pluginLoaders = pluginLoaders;
            _typeFeatureProvider = typeFeatureProvider;
            _pluginDependencyStrategies = pluginDependencyStrategies;
            _pluginPriorityStrategies = pluginPriorityStrategies;
        }

        public IEnumerable<IFeatureInfo> GetFeatures()
        {
            ExecuteInitialized();

            return _orderedFeatures;
        }

        public IEnumerable<IFeatureInfo> GetFeatures(string[] featureIdsToLoad)
        {
            ExecuteInitialized();

            var featuresWithDependencies = featureIdsToLoad
                .SelectMany(id => GetDependencyFeatures(id))
                .Distinct();

            return _orderedFeatures.Where(e => featuresWithDependencies.Any(f => f.Id == e.Id));
        }

        public Task<IEnumerable<FeatureEntry>> GetFeaturesAsync()
        {
            var featuresIds = GetFeatures().Select(f => f.Id).ToList();

            var loadedFeatures = _features.Values
                .OrderBy(f => featuresIds.IndexOf(f.FeatureInfo.Id));

            return Task.FromResult<IEnumerable<FeatureEntry>>(loadedFeatures);
        }

        public Task<IEnumerable<FeatureEntry>> GetFeaturesAsync(string[] featureIdsToLoad)
        {
            ExecuteInitialized();

            var featuresIds = GetFeatures(featureIdsToLoad).Select(f => f.Id).ToList();

            var loadedFeatures = _features.Values
                .Where(f => featuresIds.Contains(f.FeatureInfo.Id))
                .OrderBy(f => featuresIds.IndexOf(f.FeatureInfo.Id));

            return Task.FromResult<IEnumerable<FeatureEntry>>(loadedFeatures);
        }

        public IEnumerable<IFeatureInfo> GetDependencyFeatures(string featureId)
        {
            ExecuteInitialized();

            return _dependencyFeatures.GetOrAdd(featureId, (key) => new Lazy<IEnumerable<IFeatureInfo>>(() =>
            {
                if (!_features.ContainsKey(key))
                {
                    return Enumerable.Empty<IFeatureInfo>();
                }

                var feature = _features[key].FeatureInfo;

                var dependencies = new HashSet<IFeatureInfo>() { feature };
                var stack = new Stack<IFeatureInfo[]>();

                stack.Push(GetDependencyFeaturesFunc(feature, _orderedFeatures));

                while (stack.Count > 0)
                {
                    var next = stack.Pop();
                    foreach (var dependency in next.Where(dependency => !dependencies.Contains(dependency)))
                    {
                        dependencies.Add(dependency);
                        stack.Push(GetDependencyFeaturesFunc(dependency, _orderedFeatures));
                    }
                }

                return dependencies.Reverse();
            })).Value;
        }

        public IEnumerable<IFeatureInfo> GetFeatureDependencies(string featureId)
        {
            ExecuteInitialized();

            return _featureDependencies.GetOrAdd(featureId, (key) => new Lazy<IEnumerable<IFeatureInfo>>(() =>
            {
                if (!_features.ContainsKey(key))
                {
                    return Enumerable.Empty<IFeatureInfo>();
                }

                var feature = _features[key].FeatureInfo;
                var dependencies = new HashSet<IFeatureInfo>() { feature };
                var stack = new Stack<IFeatureInfo[]>();

                stack.Push(GetFeatureDependenciesFunc(feature, _orderedFeatures));

                while (stack.Count > 0)
                {
                    var next = stack.Pop();
                    foreach (var dependency in next.Where(dependency => !dependencies.Contains(dependency)))
                    {
                        dependencies.Add(dependency);
                        stack.Push(GetDependencyFeaturesFunc(dependency, _orderedFeatures));
                    }
                }

                return dependencies.Reverse();
            })).Value;
        }

        public IPluginInfo GetPlugin(string id)
        {
            ExecuteInitialized();

            if (_plugins.TryGetValue(id, out PluginEntry plugin))
            {
                return plugin.PluginInfo;
            }

            return new NullPluginInfo(id);
        }

        public IEnumerable<IPluginInfo> GetPlugins()
        {
            ExecuteInitialized();

            return _plugins.Values.Select(p => p.PluginInfo);
        }

        public Task<PluginEntry> GetPluginEntryAsync(IPluginInfo plugin)
        {
            ExecuteInitialized();

            if (_plugins.TryGetValue(plugin.Id, out PluginEntry entry))
            {
                return Task.FromResult(entry);
            }
            return Task.FromResult<PluginEntry>(null);
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

                    var entry = new PluginEntry();

                    foreach (var pluginLoader in _pluginLoaders)
                    {
                        var currentLoadResult = pluginLoader.Load(plugin);

                        if (currentLoadResult == null) continue;

                        if (entry.PluginInfo == null)
                        {
                            entry = currentLoadResult;
                        }
                        else
                        {
                            entry.Exports = entry.Exports.Concat(currentLoadResult.Exports).Distinct();
                        }

                        entry.HasError = currentLoadResult.HasError;
                    }

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

        private static Func<IFeatureInfo, IFeatureInfo[], IFeatureInfo[]> GetFeatureDependenciesFunc =
            new Func<IFeatureInfo, IFeatureInfo[], IFeatureInfo[]>(
                (currentFeature, fs) => fs
                    .Where(f => f.Dependencies.Any(dep => dep == currentFeature.Id)).OrderBy(x => x.Id).ToArray());

        private static Func<IFeatureInfo, IFeatureInfo[], IFeatureInfo[]> GetDependencyFeaturesFunc =
            new Func<IFeatureInfo, IFeatureInfo[], IFeatureInfo[]>(
                (currentFeature, fs) => fs
                    .Where(f => currentFeature.Dependencies.Any(dep => dep == f.Id)).OrderByDescending(x => x.Id).ToArray());
    }
}