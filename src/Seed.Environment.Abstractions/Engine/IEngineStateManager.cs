using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Seed.Environment.Abstractions.Engine
{
    public interface IEngineStateManager
    {
        Task<EngineState> GetEngineStateAsync();

        Task UpdateEnabledStateAsync(EngineFeatureState featureState, EngineFeatureState.State value);

        Task UpdateInstalledStateAsync(EngineFeatureState featureState, EngineFeatureState.State value);
    }
}
