using Seed.Environment.Engine;
using System;
using System.Collections.Generic;
using System.Text;
using Seed.Environment.Engine.Descriptors;
using System.Threading.Tasks;
using System.Linq;

namespace Seed.Environment.Engine
{
    public class EngineStateCoordinator : IEngineDescriptorManagerEventHandler
    {
        private readonly EngineSettings _settings;
        private readonly IEngineStateManager _stateManager;
        //private readonly IDeferredTaskEngine _deferredTaskEngine;

        public EngineStateCoordinator(
            EngineSettings settings,
            //IDeferredTaskEngine deferredTaskEngine,
            IEngineStateManager stateManager)
        {
            //_deferredTaskEngine = deferredTaskEngine;
            _settings = settings;
            _stateManager = stateManager;
        }

        async Task IEngineDescriptorManagerEventHandler.Changed(EngineDescriptor descriptor, string launcher)
        {
            var engineState = await _stateManager.GetEngineStateAsync();
            foreach (var feature in descriptor.Features)
            {
                var featureId = feature.Name;
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
                if (descriptor.Features.Any(f => f.Name == featureId))
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
            //_deferredTaskEngine.AddTask(async context =>
            //{
            //    var stateManager = context.ServiceProvider.GetRequiredService<IEngineStateManager>();
            //    var engineStateUpdater = context.ServiceProvider.GetRequiredService<IEngineStateUpdater>();
            //    var engineState = await stateManager.GetEngineStateAsync();

            //    while (engineState.Features.Any(FeatureIsChanging))
            //    {
            //        var descriptor = new ShellDescriptor
            //        {
            //            Features = engineState.Features
            //                .Where(FeatureShouldBeLoadedForStateChangeNotifications)
            //                .Select(x => new ShellFeature { Id = x.Id })
            //                .ToArray()
            //        };

            //        await engineStateUpdater.ApplyChanges();
            //    }
            //});
        }

        private static bool FeatureIsChanging(EngineFeatureState shellFeatureState)
        {
            if (shellFeatureState.EnableState == EngineFeatureState.State.Rising ||
                shellFeatureState.EnableState == EngineFeatureState.State.Falling)
            {
                return true;
            }
            if (shellFeatureState.InstallState == EngineFeatureState.State.Rising ||
                shellFeatureState.InstallState == EngineFeatureState.State.Falling)
            {
                return true;
            }
            return false;
        }

        private static bool FeatureShouldBeLoadedForStateChangeNotifications(EngineFeatureState shellFeatureState)
        {
            return FeatureIsChanging(shellFeatureState) || shellFeatureState.EnableState == EngineFeatureState.State.Up;
        }
    }
}
