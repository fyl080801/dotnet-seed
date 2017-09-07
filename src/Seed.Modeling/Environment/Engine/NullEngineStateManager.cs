using Seed.Environment.Engine;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Seed.Environment.Engine
{
    public class NullEngineStateManager : IEngineStateManager
    {
        public Task<EngineState> GetEngineStateAsync()
        {
            return Task.FromResult(new EngineState());
        }

        public Task UpdateEnabledStateAsync(EngineFeatureState featureState, EngineFeatureState.State value)
        {
            return Task.CompletedTask;
        }

        public Task UpdateInstalledStateAsync(EngineFeatureState featureState, EngineFeatureState.State value)
        {
            return Task.CompletedTask;
        }
    }
}
