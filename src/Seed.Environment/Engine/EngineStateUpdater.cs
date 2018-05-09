using Microsoft.Extensions.Logging;
using Seed.Environment.Engine.Extensions;
using Seed.Plugins;
using Seed.Plugins.Feature;
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

        ILogger _logger;
        //private readonly IDeferredTaskEngine _deferredTaskEngine;

        public EngineStateUpdater(
            EngineSettings settings,
            IEngineStateManager stateManager,
            IPluginManager pluginManager,
            //IDeferredTaskEngine deferredTaskEngine,
            IEnumerable<IFeatureEventHandler> featureEventHandlers,
            ILogger<EngineStateUpdater> logger)
        {
            //_deferredTaskEngine = deferredTaskEngine;
            _settings = settings;
            _stateManager = stateManager;
            _pluginManager = pluginManager;
            _featureEventHandlers = featureEventHandlers;
            _logger = logger;
        }

        public async Task ApplyChanges()
        {
            var loadedFeatures = await _pluginManager.GetFeaturesAsync();

            var engineState = await _stateManager.GetEngineStateAsync();

            var loadedEntries = loadedFeatures
                .Select(fe => new
                {
                    Feature = fe,
                    FeatureDescriptor = fe.FeatureInfo,
                    FeatureState = engineState.Features.FirstOrDefault(s => s.Id == fe.FeatureInfo.Id),
                })
                .Where(entry => entry.FeatureState != null)
                .ToArray();

            var additionalState = engineState.Features.Except(loadedEntries.Select(entry => entry.FeatureState));

            var allEntries = loadedEntries.Concat(additionalState.Select(featureState =>
            {
                var featureDescriptor = new InternalFeatureInfo(featureState.Id, new InternalPluginInfo(featureState.Id));

                return new
                {
                    Feature = (FeatureEntry)new NonCompiledFeatureEntry(featureDescriptor),
                    FeatureDescriptor = (IFeatureInfo)featureDescriptor,
                    FeatureState = featureState
                };
            })).ToArray();

            foreach (var entry in allEntries.Reverse().Where(entry => entry.FeatureState.EnableState == EngineFeatureState.State.Falling))
            {
                _featureEventHandlers.Invoke(x => x.Disabling(entry.Feature.FeatureInfo), _logger);
                await _stateManager.UpdateEnabledStateAsync(entry.FeatureState, EngineFeatureState.State.Down);
                _featureEventHandlers.Invoke(x => x.Disabled(entry.Feature.FeatureInfo), _logger);
            }

            foreach (var entry in allEntries.Reverse().Where(entry => entry.FeatureState.InstallState == EngineFeatureState.State.Falling))
            {
                _featureEventHandlers.Invoke(x => x.Uninstalling(entry.Feature.FeatureInfo), _logger);
                await _stateManager.UpdateInstalledStateAsync(entry.FeatureState, EngineFeatureState.State.Down);
                _featureEventHandlers.Invoke(x => x.Uninstalled(entry.Feature.FeatureInfo), _logger);
            }

            foreach (var entry in allEntries.Where(entry => IsRising(entry.FeatureState)))
            {
                if (entry.FeatureState.InstallState == EngineFeatureState.State.Rising)
                {
                    _featureEventHandlers.Invoke(x => x.Installing(entry.Feature.FeatureInfo), _logger);
                    await _stateManager.UpdateInstalledStateAsync(entry.FeatureState, EngineFeatureState.State.Up);
                    _featureEventHandlers.Invoke(x => x.Installed(entry.Feature.FeatureInfo), _logger);
                }
                if (entry.FeatureState.EnableState == EngineFeatureState.State.Rising)
                {
                    _featureEventHandlers.Invoke(x => x.Enabling(entry.Feature.FeatureInfo), _logger);
                    await _stateManager.UpdateEnabledStateAsync(entry.FeatureState, EngineFeatureState.State.Up);
                    _featureEventHandlers.Invoke(x => x.Enabled(entry.Feature.FeatureInfo), _logger);
                }
            }
        }

        static bool IsRising(EngineFeatureState state)
        {
            return state.InstallState == EngineFeatureState.State.Rising
                || state.EnableState == EngineFeatureState.State.Rising;
        }
    }
}
