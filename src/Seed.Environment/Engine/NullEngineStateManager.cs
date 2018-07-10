using Microsoft.Extensions.Logging;
using Seed.Environment.Engine.State;
using System.Threading.Tasks;

namespace Seed.Environment.Engine
{
    public class NullEngineStateManager : IEngineStateManager
    {
        public NullEngineStateManager(ILogger<NullEngineStateManager> logger)
        {
            Logger = logger;
        }

        ILogger Logger { get; set; }

        public Task<EngineState> GetEngineStateAsync()
        {
            return Task.FromResult(new EngineState());
        }

        public Task UpdateEnabledStateAsync(EngineFeatureState featureState, EngineFeatureState.States value)
        {
            if (Logger.IsEnabled(LogLevel.Debug))
            {
                Logger.LogDebug("Feature '{FeatureName}' EnableState changed from '{FeatureState}' to '{FeatureState}'",
                             featureState.Id, featureState.EnableState, value);
            }

            return Task.CompletedTask;
        }

        public Task UpdateInstalledStateAsync(EngineFeatureState featureState, EngineFeatureState.States value)
        {
            if (Logger.IsEnabled(LogLevel.Debug))
            {
                Logger.LogDebug("Feature '{FeatureName}' InstallState changed from '{FeatureState}' to '{FeatureState}'", featureState.Id, featureState.InstallState, value);
            }

            return Task.CompletedTask;
        }
    }
}
