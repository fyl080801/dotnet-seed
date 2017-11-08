using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Seed.Environment.Engine.Data
{
    public class EngineStateManager : IEngineStateManager
    {
        public Task<EngineState> GetEngineStateAsync()
        {
            throw new NotImplementedException();
        }

        public Task UpdateEnabledStateAsync(EngineFeatureState featureState, EngineFeatureState.State value)
        {
            throw new NotImplementedException();
        }

        public Task UpdateInstalledStateAsync(EngineFeatureState featureState, EngineFeatureState.State value)
        {
            throw new NotImplementedException();
        }
    }
}
