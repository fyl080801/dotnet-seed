using Microsoft.Extensions.Logging;
using Seed.Environment.Engine.Extensions;
using Seed.Modules.DeferredTasks;
using Seed.Plugins;
using Seed.Plugins.Features;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Seed.Environment.Engine
{
    public class EngineStateUpdater : IEngineStateUpdater
    {
        private readonly EngineSettings _settings;
        private readonly IEngineStateManager _stateManager;
        private readonly IPluginManager _pluginManager;
        private readonly IEnumerable<IFeatureEventHandler> _featureEventHandlers;
        private readonly IDeferredTaskEngine _deferredTaskEngine;

        public EngineStateUpdater(
            EngineSettings settings,
            IEngineStateManager stateManager,
            IPluginManager extensionManager,
            IEnumerable<IFeatureEventHandler> featureEventHandlers,
            IDeferredTaskEngine deferredTaskEngine,
            ILogger<EngineStateUpdater> logger)
        {
            _deferredTaskEngine = deferredTaskEngine;
            _settings = settings;
            _stateManager = stateManager;
            _pluginManager = extensionManager;
            _featureEventHandlers = featureEventHandlers;
            Logger = logger;
        }

        public ILogger Logger { get; set; }

        public async Task ApplyChanges()
        {
            if (Logger.IsEnabled(LogLevel.Information))
            {
                Logger.LogInformation("Applying changes for for tenant '{TenantName}'", _settings.Name);
            }

            var loadedFeatures = await _pluginManager.LoadFeaturesAsync();

            var shellState = await _stateManager.GetEngineStateAsync();

            var loadedEntries = loadedFeatures
                .Select(fe => new
                {
                    Feature = fe,
                    FeatureDescriptor = fe.FeatureInfo,
                    FeatureState = shellState.Features.FirstOrDefault(s => s.Id == fe.FeatureInfo.Id),
                })
                .Where(entry => entry.FeatureState != null)
                .ToArray();

            var additionalState = shellState.Features.Except(loadedEntries.Select(entry => entry.FeatureState));

            var allEntries = loadedEntries.Concat(additionalState.Select(featureState =>
            {
                var featureDescriptor = new InternalFeatureInfo(
                    featureState.Id,
                    new InternalPluginInfo(featureState.Id)
                    );

                return new
                {
                    Feature = (FeatureEntry)new NonCompiledFeatureEntry(featureDescriptor),
                    FeatureDescriptor = (IFeatureInfo)featureDescriptor,
                    FeatureState = featureState
                };
            })).ToArray();

            foreach (var entry in allEntries.Reverse().Where(entry => entry.FeatureState.EnableState == EngineFeatureState.State.Falling))
            {
                if (Logger.IsEnabled(LogLevel.Information))
                {
                    Logger.LogInformation("Disabling feature '{FeatureName}'", entry.Feature.FeatureInfo.Id);
                }

                _featureEventHandlers.Invoke(x => x.Disabling(entry.Feature.FeatureInfo), Logger);
                await _stateManager.UpdateEnabledStateAsync(entry.FeatureState, EngineFeatureState.State.Down);
                _featureEventHandlers.Invoke(x => x.Disabled(entry.Feature.FeatureInfo), Logger);
            }

            foreach (var entry in allEntries.Reverse().Where(entry => entry.FeatureState.InstallState == EngineFeatureState.State.Falling))
            {
                if (Logger.IsEnabled(LogLevel.Information))
                {
                    Logger.LogInformation("Uninstalling feature '{FeatureName}'", entry.Feature.FeatureInfo.Id);
                }

                _featureEventHandlers.Invoke(x => x.Uninstalling(entry.Feature.FeatureInfo), Logger);
                await _stateManager.UpdateInstalledStateAsync(entry.FeatureState, EngineFeatureState.State.Down);
                _featureEventHandlers.Invoke(x => x.Uninstalled(entry.Feature.FeatureInfo), Logger);
            }

            foreach (var entry in allEntries.Where(entry => IsRising(entry.FeatureState)))
            {
                if (entry.FeatureState.InstallState == EngineFeatureState.State.Rising)
                {
                    if (Logger.IsEnabled(LogLevel.Information))
                    {
                        Logger.LogInformation("Installing feature '{FeatureName}'", entry.Feature.FeatureInfo.Id);
                    }

                    _featureEventHandlers.Invoke(x => x.Installing(entry.Feature.FeatureInfo), Logger);
                    await _stateManager.UpdateInstalledStateAsync(entry.FeatureState, EngineFeatureState.State.Up);
                    _featureEventHandlers.Invoke(x => x.Installed(entry.Feature.FeatureInfo), Logger);
                }
                if (entry.FeatureState.EnableState == EngineFeatureState.State.Rising)
                {
                    if (Logger.IsEnabled(LogLevel.Information))
                    {
                        Logger.LogInformation("Enabling feature '{FeatureName}'", entry.Feature.FeatureInfo.Id);
                    }

                    _featureEventHandlers.Invoke(x => x.Enabling(entry.Feature.FeatureInfo), Logger);
                    await _stateManager.UpdateEnabledStateAsync(entry.FeatureState, EngineFeatureState.State.Up);
                    _featureEventHandlers.Invoke(x => x.Enabled(entry.Feature.FeatureInfo), Logger);
                }
            }
        }

        static bool IsRising(EngineFeatureState state)
        {
            return state.InstallState == EngineFeatureState.State.Rising ||
                   state.EnableState == EngineFeatureState.State.Rising;
        }
    }
}
