using Microsoft.Extensions.Logging;
using Seed.Data;
using Seed.Environment.Engine.State;
using System.Linq;
using System.Threading.Tasks;

namespace Seed.Environment.Engine.Data
{
    public class EngineStateManager : IEngineStateManager
    {
        private EngineState _engineState;
        private readonly IDbContext _db;

        public EngineStateManager(IDbContext db, ILogger<EngineStateManager> logger)
        {
            _db = db;
            Logger = logger;
        }

        ILogger Logger { get; set; }

        public async Task<EngineState> GetEngineStateAsync()
        {
            if (_engineState != null)
            {
                return _engineState;
            }

            _engineState = await Task.FromResult(_db.Set<EngineState>().FirstOrDefault());

            if (_engineState == null)
            {
                _engineState = new EngineState();
                UpdateEngineState();
            }

            return _engineState;
        }

        public async Task UpdateEnabledStateAsync(EngineFeatureState featureState, EngineFeatureState.States value)
        {
            if (Logger.IsEnabled(LogLevel.Debug))
            {
                Logger.LogDebug("Feature '{FeatureName}' EnableState changed from '{FeatureState}' to '{FeatureState}'",
                             featureState.Id, featureState.EnableState, value);
            }

            var previousFeatureState = await GetOrCreateFeatureStateAsync(featureState.Id);
            if (previousFeatureState.EnableState != featureState.EnableState)
            {
                if (Logger.IsEnabled(LogLevel.Warning))
                {
                    Logger.LogWarning("Feature '{FeatureName}' prior EnableState was '{FeatureState}' when '{FeatureState}' was expected",
                               featureState.Id, previousFeatureState.EnableState, featureState.EnableState);
                }
            }

            previousFeatureState.EnableState = value;
            featureState.EnableState = value;

            UpdateEngineState();
        }

        public async Task UpdateInstalledStateAsync(EngineFeatureState featureState, EngineFeatureState.States value)
        {
            if (Logger.IsEnabled(LogLevel.Debug))
            {
                Logger.LogDebug("Feature '{FeatureName}' InstallState changed from '{FeatureState}' to '{FeatureState}'", featureState.Id, featureState.InstallState, value);
            }

            var previousFeatureState = await GetOrCreateFeatureStateAsync(featureState.Id);
            if (previousFeatureState.InstallState != featureState.InstallState)
            {
                if (Logger.IsEnabled(LogLevel.Warning))
                {
                    Logger.LogWarning("Feature '{FeatureName}' prior InstallState was '{FeatureState}' when '{FeatureState}' was expected",
                               featureState.Id, previousFeatureState.InstallState, featureState.InstallState);
                }
            }

            previousFeatureState.InstallState = value;
            featureState.InstallState = value;

            UpdateEngineState();
        }

        private async Task<EngineFeatureState> GetOrCreateFeatureStateAsync(string id)
        {
            var engineState = await GetEngineStateAsync();
            var featureState = engineState.Features.FirstOrDefault(x => x.Id == id);

            if (featureState == null)
            {
                featureState = new EngineFeatureState() { Id = id };
                _engineState.Features.Add(featureState);
            }

            return featureState;
        }

        private void UpdateEngineState()
        {
            _db.SaveChanges();
        }
    }
}
