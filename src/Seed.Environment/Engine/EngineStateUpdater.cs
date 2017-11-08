using Seed.Events;
using Seed.Events.Extensions;
using Seed.Plugins;
using Seed.Plugins.Feature;
using System.Linq;
using System.Threading.Tasks;

namespace Seed.Environment.Engine
{
    public class EngineStateUpdater : IEngineStateUpdater
    {
        private readonly EngineSettings _settings;
        private readonly IEngineStateManager _stateManager;
        private readonly IPluginManager _pluginManager;
        private readonly IEventBus _eventBus;
        //private readonly IDeferredTaskEngine _deferredTaskEngine;

        public EngineStateUpdater(
            EngineSettings settings,
            IEngineStateManager stateManager,
            IPluginManager pluginManager,
            //IDeferredTaskEngine deferredTaskEngine,
            IEventBus eventBus)
        {
            //_deferredTaskEngine = deferredTaskEngine;
            _settings = settings;
            _stateManager = stateManager;
            _pluginManager = pluginManager;
            _eventBus = eventBus;
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
                _eventBus.Notify<IFeatureEventHandler>(x => x.Disabling(entry.Feature.FeatureInfo));
                await _stateManager.UpdateEnabledStateAsync(entry.FeatureState, EngineFeatureState.State.Down);
                _eventBus.Notify<IFeatureEventHandler>(x => x.Disabled(entry.Feature.FeatureInfo));
            }
            
            foreach (var entry in allEntries.Reverse().Where(entry => entry.FeatureState.InstallState == EngineFeatureState.State.Falling))
            {
                _eventBus.Notify<IFeatureEventHandler>(x => x.Uninstalling(entry.Feature.FeatureInfo));
                await _stateManager.UpdateInstalledStateAsync(entry.FeatureState, EngineFeatureState.State.Down);
                _eventBus.Notify<IFeatureEventHandler>(x => x.Uninstalled(entry.Feature.FeatureInfo));
            }
            
            foreach (var entry in allEntries.Where(entry => IsRising(entry.FeatureState)))
            {
                if (entry.FeatureState.InstallState == EngineFeatureState.State.Rising)
                {
                    _eventBus.Notify<IFeatureEventHandler>(x => x.Installing(entry.Feature.FeatureInfo));
                    await _stateManager.UpdateInstalledStateAsync(entry.FeatureState, EngineFeatureState.State.Up);
                    _eventBus.Notify<IFeatureEventHandler>(x => x.Installed(entry.Feature.FeatureInfo));
                }
                if (entry.FeatureState.EnableState == EngineFeatureState.State.Rising)
                {
                    _eventBus.Notify<IFeatureEventHandler>(x => x.Enabling(entry.Feature.FeatureInfo));
                    await _stateManager.UpdateEnabledStateAsync(entry.FeatureState, EngineFeatureState.State.Up);
                    _eventBus.Notify<IFeatureEventHandler>(x => x.Enabled(entry.Feature.FeatureInfo));
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
