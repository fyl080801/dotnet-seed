using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Logging;
using Seed.Modules;
using Seed.Environment.Plugins.Features;
using Seed.Environment.Plugins.Loaders;
using Seed.Environment.Plugins.Manifests;
using Seed.Environment.Plugins.Utility;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace Seed.Environment.Plugins
{
    public class PluginManager : IPluginManager
    {
        private readonly IHostingEnvironment _hostingEnvironment;
        private readonly IEnumerable<IPluginDependencyStrategy> _pluginDependencyStrategies;
        private readonly IEnumerable<IPluginPriorityStrategy> _pluginPriorityStrategies;
        private readonly ITypeFeatureProvider _typeFeatureProvider;
        private readonly IFeaturesProvider _featuresProvider;

        private IDictionary<string, PluginEntry> _plugins;
        private IEnumerable<IPluginInfo> _pluginInfos;
        private IDictionary<string, FeatureEntry> _features;
        private IFeatureInfo[] _featureInfos;

        private ConcurrentDictionary<string, Lazy<IEnumerable<IFeatureInfo>>> _featureDependencies
            = new ConcurrentDictionary<string, Lazy<IEnumerable<IFeatureInfo>>>();

        private ConcurrentDictionary<string, Lazy<IEnumerable<IFeatureInfo>>> _dependentFeatures
            = new ConcurrentDictionary<string, Lazy<IEnumerable<IFeatureInfo>>>();

        private static Func<IFeatureInfo, IFeatureInfo[], IFeatureInfo[]> GetDependentFeaturesFunc =
            new Func<IFeatureInfo, IFeatureInfo[], IFeatureInfo[]>(
                (currentFeature, fs) => fs
                    .Where(f => f.Dependencies.Any(dep => dep == currentFeature.Id))
                    .ToArray());

        private static Func<IFeatureInfo, IFeatureInfo[], IFeatureInfo[]> GetFeatureDependenciesFunc =
            new Func<IFeatureInfo, IFeatureInfo[], IFeatureInfo[]>(
                (currentFeature, fs) => fs
                    .Where(f => currentFeature.Dependencies.Any(dep => dep == f.Id))
                    .ToArray());

        private bool _isInitialized = false;
        private static object InitializationSyncLock = new object();

        public PluginManager(
            IHostingEnvironment hostingEnvironment,
            IEnumerable<IPluginDependencyStrategy> pluginDependencyStrategies,
            IEnumerable<IPluginPriorityStrategy> pluginPriorityStrategies,
            ITypeFeatureProvider typeFeatureProvider,
            IFeaturesProvider featuresProvider,
            ILogger<PluginManager> logger)
        {
            _hostingEnvironment = hostingEnvironment;
            _pluginDependencyStrategies = pluginDependencyStrategies;
            _pluginPriorityStrategies = pluginPriorityStrategies;
            _typeFeatureProvider = typeFeatureProvider;
            _featuresProvider = featuresProvider;
            L = logger;
        }

        public ILogger L { get; set; }

        public IPluginInfo GetPlugin(string pluginId)
        {
            EnsureInitialized();

            if (!String.IsNullOrEmpty(pluginId) && _plugins.TryGetValue(pluginId, out PluginEntry plugin))
            {
                return plugin.PluginInfo;
            }

            return new NotFoundPluginInfo(pluginId);
        }

        public IEnumerable<IPluginInfo> GetPlugins()
        {
            EnsureInitialized();

            return _pluginInfos;
        }

        public IEnumerable<IFeatureInfo> GetFeatures(string[] featureIdsToLoad)
        {
            EnsureInitialized();

            var allDependencies = featureIdsToLoad
                .SelectMany(featureId => GetFeatureDependencies(featureId))
                .Distinct();

            return _featureInfos
                .Where(f => allDependencies.Any(d => d.Id == f.Id));
        }

        public Task<PluginEntry> LoadPluginAsync(IPluginInfo extensionInfo)
        {
            EnsureInitialized();

            if (_plugins.TryGetValue(extensionInfo.Id, out PluginEntry extension))
            {
                return Task.FromResult(extension);
            }

            return Task.FromResult<PluginEntry>(null);
        }

        public Task<IEnumerable<FeatureEntry>> LoadFeaturesAsync()
        {
            EnsureInitialized();
            return Task.FromResult<IEnumerable<FeatureEntry>>(_features.Values);
        }

        public Task<IEnumerable<FeatureEntry>> LoadFeaturesAsync(string[] featureIdsToLoad)
        {
            EnsureInitialized();

            var features = GetFeatures(featureIdsToLoad).Select(f => f.Id).ToList();

            var loadedFeatures = _features.Values
                .Where(f => features.Contains(f.FeatureInfo.Id));

            return Task.FromResult(loadedFeatures);
        }

        public IEnumerable<IFeatureInfo> GetFeatureDependencies(string featureId)
        {
            EnsureInitialized();

            return _featureDependencies.GetOrAdd(featureId, (key) => new Lazy<IEnumerable<IFeatureInfo>>(() =>
            {
                if (!_features.ContainsKey(key))
                {
                    return Enumerable.Empty<IFeatureInfo>();
                }

                var feature = _features[key].FeatureInfo;

                return GetFeatureDependencies(feature, _featureInfos);
            })).Value;
        }

        public IEnumerable<IFeatureInfo> GetDependentFeatures(string featureId)
        {
            EnsureInitialized();

            return _dependentFeatures.GetOrAdd(featureId, (key) => new Lazy<IEnumerable<IFeatureInfo>>(() =>
            {
                if (!_features.ContainsKey(key))
                {
                    return Enumerable.Empty<IFeatureInfo>();
                }

                var feature = _features[key].FeatureInfo;

                return GetDependentFeatures(feature, _featureInfos);
            })).Value;
        }

        private IEnumerable<IFeatureInfo> GetFeatureDependencies(IFeatureInfo feature, IFeatureInfo[] features)
        {
            var dependencies = new HashSet<IFeatureInfo>() { feature };
            var stack = new Stack<IFeatureInfo[]>();

            stack.Push(GetFeatureDependenciesFunc(feature, features));

            while (stack.Count > 0)
            {
                var next = stack.Pop();
                foreach (var dependency in next.Where(dependency => !dependencies.Contains(dependency)))
                {
                    dependencies.Add(dependency);
                    stack.Push(GetFeatureDependenciesFunc(dependency, features));
                }
            }

            return _featureInfos.Where(f => dependencies.Any(d => d.Id == f.Id));
        }

        private IEnumerable<IFeatureInfo> GetDependentFeatures(IFeatureInfo feature, IFeatureInfo[] features)
        {
            var dependencies = new HashSet<IFeatureInfo>() { feature };
            var stack = new Stack<IFeatureInfo[]>();

            stack.Push(GetDependentFeaturesFunc(feature, features));

            while (stack.Count > 0)
            {
                var next = stack.Pop();
                foreach (var dependency in next.Where(dependency => !dependencies.Contains(dependency)))
                {
                    dependencies.Add(dependency);
                    stack.Push(GetDependentFeaturesFunc(dependency, features));
                }
            }

            return _featureInfos.Where(f => dependencies.Any(d => d.Id == f.Id));
        }

        public IEnumerable<IFeatureInfo> GetFeatures()
        {
            EnsureInitialized();

            return _featureInfos;
        }

        private static string GetSourceFeatureNameForType(Type type, string pluginId)
        {
            var attribute = type.GetCustomAttributes<FeatureAttribute>(false).FirstOrDefault();

            return attribute?.FeatureName ?? pluginId;
        }

        private void EnsureInitialized()
        {
            if (_isInitialized)
            {
                return;
            }

            lock (InitializationSyncLock)
            {
                if (_isInitialized)
                {
                    return;
                }

                var moduleNames = _hostingEnvironment.GetApplication().ModuleNames;
                var loadedPlugins = new ConcurrentDictionary<string, PluginEntry>();

                Parallel.ForEach(moduleNames, new ParallelOptions { MaxDegreeOfParallelism = 8 }, (name) =>
                {
                    var module = _hostingEnvironment.GetModule(name);

                    if (!module.ModuleInfo.Exists)
                    {
                        return;
                    }
                    var manifestInfo = new ManifestInfo(module.ModuleInfo);

                    var pluginInfo = new PluginInfo(module.SubPath, manifestInfo, (mi, ei) =>
                    {
                        return _featuresProvider.GetFeatures(ei, mi);
                    });

                    var entry = new PluginEntry
                    {
                        PluginInfo = pluginInfo,
                        Assembly = module.Assembly,
                        ExportedTypes = module.Assembly.ExportedTypes
                    };

                    loadedPlugins.TryAdd(module.Name, entry);
                });

                var loadedFeatures = new Dictionary<string, FeatureEntry>();

                var allTypesByExtension = loadedPlugins.SelectMany(extension =>
                    extension.Value.ExportedTypes.Where(IsComponentType)
                    .Select(type => new
                    {
                        PluginEntry = extension.Value,
                        Type = type
                    })).ToArray();

                var typesByFeature = allTypesByExtension
                    .GroupBy(typeByExtension => GetSourceFeatureNameForType(
                        typeByExtension.Type,
                        typeByExtension.PluginEntry.PluginInfo.Id))
                    .ToDictionary(
                        group => group.Key,
                        group => group.Select(typesByExtension => typesByExtension.Type).ToArray());

                foreach (var loadedExtension in loadedPlugins)
                {
                    var plugin = loadedExtension.Value;

                    foreach (var feature in plugin.PluginInfo.Features)
                    {
                        if (typesByFeature.TryGetValue(feature.Id, out var featureTypes))
                        {
                            foreach (var type in featureTypes)
                            {
                                _typeFeatureProvider.TryAdd(type, feature);
                            }
                        }
                        else
                        {
                            featureTypes = Array.Empty<Type>();
                        }

                        loadedFeatures.Add(feature.Id, new CompiledFeatureEntry(feature, featureTypes));
                    }
                };

                _featureInfos = Order(loadedFeatures.Values.Select(f => f.FeatureInfo));
                _features = _featureInfos.ToDictionary(f => f.Id, f => loadedFeatures[f.Id]);

                _pluginInfos = _featureInfos.Where(f => f.Id == f.Plugin.Features.First().Id)
                    .Select(f => f.Plugin);

                _plugins = _pluginInfos.ToDictionary(e => e.Id, e => loadedPlugins[e.Id]);

                _isInitialized = true;
            }
        }

        private bool IsComponentType(Type type)
        {
            return type.IsClass && !type.IsAbstract && type.IsPublic;
        }

        private IFeatureInfo[] Order(IEnumerable<IFeatureInfo> featuresToOrder)
        {
            return featuresToOrder
                .OrderBy(x => x.Id)
                .OrderByDependenciesAndPriorities(HasDependency, GetPriority)
                .ToArray();
        }

        private bool HasDependency(IFeatureInfo f1, IFeatureInfo f2)
        {
            return _pluginDependencyStrategies.Any(s => s.HasDependency(f1, f2));
        }

        private int GetPriority(IFeatureInfo feature)
        {
            return _pluginPriorityStrategies.Sum(s => s.GetPriority(feature));
        }
    }
}
