using System.Threading.Tasks;
using Seed.Environment.Engine.State;

namespace Seed.Environment.Engine
{
    public interface IEngineStateManager
    {
        Task<EngineState> GetEngineStateAsync();

        Task UpdateEnabledStateAsync(EngineFeatureState featureState, EngineFeatureState.States value);

        Task UpdateInstalledStateAsync(EngineFeatureState featureState, EngineFeatureState.States value);
    }
}
