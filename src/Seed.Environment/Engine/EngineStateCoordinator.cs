using Microsoft.Extensions.DependencyInjection;
using Seed.Environment.Engine.Descriptors;
using Seed.Modules.DeferredTasks;
using System.Linq;
using System.Threading.Tasks;

namespace Seed.Environment.Engine
{
    public class EngineStateCoordinator : IEngineDescriptorManagerEventHandler
    {
        readonly EngineSettings _settings;
        readonly IEngineStateManager _stateManager;
        readonly IDeferredTaskEngine _deferredTaskEngine;

        public EngineStateCoordinator(
            EngineSettings settings,
            IDeferredTaskEngine deferredTaskEngine,
            IEngineStateManager stateManager)
        {
            _deferredTaskEngine = deferredTaskEngine;
            _settings = settings;
            _stateManager = stateManager;
        }

        async Task IEngineDescriptorManagerEventHandler.Changed(EngineDescriptor descriptor, string tenant)
        {
            var engineState = await _stateManager.GetEngineStateAsync();
            foreach (var feature in descriptor.Features)
            {
                var featureId = feature.Id;
                var featureState = engineState.Features.SingleOrDefault(f => f.Id == featureId);
                if (featureState == null)
                {
                    featureState = new EngineFeatureState
                    {
                        Id = featureId
                    };
                }
                if (!featureState.IsInstalled)
                {
                    await _stateManager.UpdateInstalledStateAsync(featureState, EngineFeatureState.State.Rising);
                }
                if (!featureState.IsEnabled)
                {
                    await _stateManager.UpdateEnabledStateAsync(featureState, EngineFeatureState.State.Rising);
                }
            }
            foreach (var featureState in engineState.Features)
            {
                var featureId = featureState.Id;
                if (descriptor.Features.Any(f => f.Id == featureId))
                {
                    continue;
                }
                if (!featureState.IsDisabled)
                {
                    await _stateManager.UpdateEnabledStateAsync(featureState, EngineFeatureState.State.Falling);
                }
            }

            FireApplyChangesIfNeeded();
        }

        private void FireApplyChangesIfNeeded()
        {
            _deferredTaskEngine.AddTask(async context =>
            {
                var stateManager = context.ServiceProvider.GetRequiredService<IEngineStateManager>();
                var engineStateUpdater = context.ServiceProvider.GetRequiredService<IEngineStateUpdater>();
                var engineState = await stateManager.GetEngineStateAsync();

                while (engineState.Features.Any(FeatureIsChanging))
                {
                    var descriptor = new EngineDescriptor()
                    {
                        Features = engineState.Features
                            .Where(FeatureShouldBeLoadedForStateChangeNotifications)
                            .Select(x => new EngineFeature { Id = x.Id })
                            .ToArray()
                    };

                    await engineStateUpdater.ApplyChanges();
                }
            });
        }

        private static bool FeatureIsChanging(EngineFeatureState engineFeatureState)
        {
            if (engineFeatureState.EnableState == EngineFeatureState.State.Rising ||
                engineFeatureState.EnableState == EngineFeatureState.State.Falling)
            {
                return true;
            }
            if (engineFeatureState.InstallState == EngineFeatureState.State.Rising ||
                engineFeatureState.InstallState == EngineFeatureState.State.Falling)
            {
                return true;
            }
            return false;
        }

        private static bool FeatureShouldBeLoadedForStateChangeNotifications(EngineFeatureState engineFeatureState)
        {
            return FeatureIsChanging(engineFeatureState) || engineFeatureState.EnableState == EngineFeatureState.State.Up;
        }
    }
}
