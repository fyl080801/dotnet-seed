using Microsoft.Extensions.Logging;
using Seed.Environment.Engine.Descriptors;
using Seed.Plugins;
using Seed.Plugins.Features;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Seed.Environment.Engine
{
    public class EngineDescriptorFeaturesManager : IEngineDescriptorFeaturesManager
    {
        private readonly IPluginManager _pluginManager;
        private readonly IEnumerable<EngineFeature> _alwaysEnabledFeatures;
        private readonly IEngineDescriptorManager _engineDescriptorManager;

        private readonly ILogger<EngineFeaturesManager> _logger;

        public FeatureDependencyNotificationHandler FeatureDependencyNotification { get; set; }

        public EngineDescriptorFeaturesManager(
            IPluginManager pluginManager,
            IEnumerable<EngineFeature> engineFeatures,
            IEngineDescriptorManager engineDescriptorManager,
            ILogger<EngineFeaturesManager> logger)
        {
            _pluginManager = pluginManager;
            _alwaysEnabledFeatures = engineFeatures.Where(f => f.AlwaysEnabled).ToArray();
            _engineDescriptorManager = engineDescriptorManager;

            _logger = logger;
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
                if (_logger.IsEnabled(LogLevel.Information))
                {
                    foreach (var feature in featuresToEnable)
                    {
                        _logger.LogInformation("Enabling feature '{FeatureName}'", feature.Id);
                    }
                }

                var enabledFeatures = await _pluginManager
                    .LoadFeaturesAsync(engineDescriptor.Features.Select(x => x.Id).ToArray());

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

        public Task<IEnumerable<IFeatureInfo>> DisableFeaturesAsync(EngineDescriptor engineDescriptor, IEnumerable<IFeatureInfo> features)
        {
            return DisableFeaturesAsync(engineDescriptor, features, false);
        }

        public async Task<IEnumerable<IFeatureInfo>> DisableFeaturesAsync(EngineDescriptor engineDescriptor, IEnumerable<IFeatureInfo> features, bool force)
        {
            var alwaysEnabledIds = _alwaysEnabledFeatures.Select(sf => sf.Id).ToArray();

            var featuresToDisable = features
                .Where(f => !alwaysEnabledIds.Contains(f.Id))
                .SelectMany(feature => GetFeaturesToDisable(feature, force))
                .Distinct()
                .ToList();

            if (featuresToDisable.Count > 0)
            {
                var loadedFeatures = await _pluginManager.LoadFeaturesAsync(engineDescriptor.Features.Select(x => x.Id).ToArray());
                var enabledFeatures = loadedFeatures.Select(x => x.FeatureInfo).ToList();

                foreach (var feature in featuresToDisable)
                {
                    enabledFeatures.Remove(feature);

                    if (_logger.IsEnabled(LogLevel.Information))
                    {
                        _logger.LogInformation("Feature '{FeatureName}' was disabled", feature.Id);
                    }
                }

                engineDescriptor.Features = enabledFeatures.Select(x => new EngineFeature(x.Id)).ToList();

                await _engineDescriptorManager.UpdateEngineDescriptorAsync(
                    engineDescriptor.SerialNumber,
                    engineDescriptor.Features,
                    engineDescriptor.Parameters);
            }

            return featuresToDisable;
        }

        private IEnumerable<IFeatureInfo> GetFeaturesToEnable(
            IFeatureInfo featureInfo,
            bool force)
        {
            var featuresToEnable = _pluginManager
                .GetFeatureDependencies(featureInfo.Id)
                .ToList();

            if (featuresToEnable.Count > 1 && !force)
            {
                if (_logger.IsEnabled(LogLevel.Warning))
                {
                    _logger.LogWarning("Additional features need to be enabled.");
                }
                if (FeatureDependencyNotification != null)
                {
                    FeatureDependencyNotification("If {0} is enabled, then you'll also need to enable {1}.", featureInfo, featuresToEnable.Where(f => f.Id != featureInfo.Id));
                }
            }

            return featuresToEnable;
        }

        private IEnumerable<IFeatureInfo> GetFeaturesToDisable(IFeatureInfo featureInfo, bool force)
        {
            var affectedFeatures = _pluginManager
                .GetDependentFeatures(featureInfo.Id)
                .ToList();

            if (affectedFeatures.Count > 1 && !force)
            {
                if (_logger.IsEnabled(LogLevel.Warning))
                {
                    _logger.LogWarning("Additional features need to be disabled.");
                }
                if (FeatureDependencyNotification != null)
                {
                    FeatureDependencyNotification("If {0} is disabled, then you'll also need to disable {1}.", featureInfo, affectedFeatures.Where(f => f.Id != featureInfo.Id));
                }
            }

            return affectedFeatures;
        }
    }
}
