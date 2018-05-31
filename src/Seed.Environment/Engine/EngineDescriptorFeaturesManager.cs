using Seed.Environment.Engine.Descriptors;
using Seed.Plugins;
using Seed.Plugins.Feature;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Seed.Environment.Engine
{
    public class EngineDescriptorFeaturesManager : IEngineDescriptorFeaturesManager
    {
        readonly IPluginManager _pluginManager;
        readonly IEngineDescriptorManager _engineDescriptorManager;

        public FeatureDependencyNotificationHandler FeatureDependencyNotification { get; set; }

        public EngineDescriptorFeaturesManager(
            IPluginManager pluginManager,
            IEngineDescriptorManager engineDescriptorManager)
        {
            _pluginManager = pluginManager;
            _engineDescriptorManager = engineDescriptorManager;
        }

        public Task<IEnumerable<IFeatureInfo>> DisableFeaturesAsync(EngineDescriptor engineDescriptor, IEnumerable<IFeatureInfo> features)
        {
            return DisableFeaturesAsync(engineDescriptor, features, false);
        }

        public async Task<IEnumerable<IFeatureInfo>> DisableFeaturesAsync(EngineDescriptor engineDescriptor, IEnumerable<IFeatureInfo> features, bool force)
        {
            var featuresToDisable = features
                .SelectMany(feature => GetFeaturesToDisable(feature, force))
                .Distinct()
                .ToList();

            if (featuresToDisable.Count > 0)
            {
                var loadedFeatures = await _pluginManager
                    .GetFeaturesAsync(engineDescriptor.Features.Select(x => x.Id).ToArray());
                var enabledFeatures = loadedFeatures.Select(x => x.FeatureInfo).ToList();

                foreach (var feature in featuresToDisable)
                {
                    enabledFeatures.Remove(feature);
                }

                engineDescriptor.Features = enabledFeatures.Select(x => new EngineFeature(x.Id)).ToList();

                await _engineDescriptorManager.UpdateEngineDescriptorAsync(
                    engineDescriptor.SerialNumber,
                    engineDescriptor.Features,
                    engineDescriptor.Parameters);
            }

            return featuresToDisable;
        }

        public Task<IEnumerable<IFeatureInfo>> EnableFeaturesAsync(EngineDescriptor engineDescriptor, IEnumerable<IFeatureInfo> features)
        {
            return EnableFeaturesAsync(engineDescriptor, features, false);
        }

        public async Task<IEnumerable<IFeatureInfo>> EnableFeaturesAsync(EngineDescriptor engineDescriptor, IEnumerable<IFeatureInfo> features, bool force)
        {
            var featuresToEnable = features
                .SelectMany(feature => GetFeaturesToEnable(feature, force))
                .Distinct()
                .ToList();

            if (featuresToEnable.Count > 0)
            {
                var enabledFeatures = await _pluginManager
                    .GetFeaturesAsync(engineDescriptor.Features.Select(x => x.Id).ToArray());

                engineDescriptor.Features = enabledFeatures
                    .Select(x => x.FeatureInfo)
                    .Concat(featuresToEnable)
                    .Distinct()
                    .Select(x => new EngineFeature(x.Id))
                    .ToList();

                await _engineDescriptorManager.UpdateEngineDescriptorAsync(
                    engineDescriptor.SerialNumber,
                    engineDescriptor.Features,
                    engineDescriptor.Parameters);
            }

            return featuresToEnable;
        }

        private IEnumerable<IFeatureInfo> GetFeaturesToEnable(IFeatureInfo featureInfo, bool force)
        {
            // 启用功能时，依赖的功能都启用
            var featuresToEnable = _pluginManager
                .GetDependencyFeatures(featureInfo.Id)
                .ToList();

            if (featuresToEnable.Count > 1 && !force)
            {
                FeatureDependencyNotification?.Invoke("如果启用 {0}, 则需要启用 {1}.", featureInfo, featuresToEnable.Where(f => f.Id != featureInfo.Id));
            }

            return featuresToEnable;
        }

        private IEnumerable<IFeatureInfo> GetFeaturesToDisable(IFeatureInfo featureInfo, bool force)
        {
            // 禁用功能时，依赖于功能的都禁用
            var affectedFeatures = _pluginManager
                .GetFeatureDependencies(featureInfo.Id)
                .ToList();

            if (affectedFeatures.Count > 1 && !force)
            {
                FeatureDependencyNotification?.Invoke("如果禁用 {0}, 必须禁用 {1}.", featureInfo, affectedFeatures.Where(f => f.Id != featureInfo.Id));
            }

            return affectedFeatures;
        }
    }
}
