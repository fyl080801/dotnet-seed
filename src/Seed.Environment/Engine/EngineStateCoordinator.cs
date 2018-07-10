using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Seed.Environment.Engine.Descriptor.Models;
using Seed.Environment.Engine.State;
using Seed.Modules.DeferredTasks;
using System.Linq;
using System.Threading.Tasks;

namespace Seed.Environment.Engine
{
    public class EngineStateCoordinator : IEngineDescriptorManagerEventHandler
    {
        private readonly EngineSettings _settings;
        private readonly IEngineStateManager _stateManager;
        private readonly IDeferredTaskEngine _deferredTaskEngine;

        public EngineStateCoordinator(
            EngineSettings settings,
            IEngineStateManager stateManager,
            IDeferredTaskEngine deferredTaskEngine,
            ILogger<EngineStateCoordinator> logger)
        {
            _deferredTaskEngine = deferredTaskEngine;
            _settings = settings;
            _stateManager = stateManager;
            Logger = logger;
        }

        public ILogger Logger { get; set; }

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
                    await _stateManager.UpdateInstalledStateAsync(featureState, EngineFeatureState.States.Rising);
                }
                if (!featureState.IsEnabled)
                {
                    await _stateManager.UpdateEnabledStateAsync(featureState, EngineFeatureState.States.Rising);
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
                    await _stateManager.UpdateEnabledStateAsync(featureState, EngineFeatureState.States.Falling);
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
                    var descriptor = new EngineDescriptor
                    {
                        Features = engineState.Features
                            .Where(FeatureShouldBeLoadedForStateChangeNotifications)
                            .Select(x => new EngineFeature { Id = x.Id })
                            .ToArray()
                    };

                    if (Logger.IsEnabled(LogLevel.Information))
                    {
                        Logger.LogInformation("Adding pending task 'ApplyChanges' for tenant '{TenantName}'", _settings.Name);
                    }

                    await engineStateUpdater.ApplyChanges();
                }
            });
        }

        private static bool FeatureIsChanging(EngineFeatureState engineFeatureState)
        {
            if (engineFeatureState.EnableState == EngineFeatureState.States.Rising ||
                engineFeatureState.EnableState == EngineFeatureState.States.Falling)
            {
                return true;
            }
            if (engineFeatureState.InstallState == EngineFeatureState.States.Rising ||
                engineFeatureState.InstallState == EngineFeatureState.States.Falling)
            {
                return true;
            }
            return false;
        }

        private static bool FeatureShouldBeLoadedForStateChangeNotifications(EngineFeatureState engineFeatureState)
        {
            return FeatureIsChanging(engineFeatureState) || engineFeatureState.EnableState == EngineFeatureState.States.Up;
        }
    }
}
