using Microsoft.Extensions.Logging;
using SeedCore.Shell.State;
using System.Threading.Tasks;

namespace SeedCore.Shell
{
    public class NullShellStateManager : IShellStateManager
    {
        public NullShellStateManager(ILogger<NullShellStateManager> logger)
        {
            Logger = logger;
        }

        ILogger Logger { get; set; }

        public Task<ShellState> GetShellStateAsync()
        {
            return Task.FromResult(new ShellState());
        }

        public Task UpdateEnabledStateAsync(ShellFeatureState featureState, ShellFeatureState.State value)
        {
            if (Logger.IsEnabled(LogLevel.Debug))
            {
                Logger.LogDebug("Feature '{FeatureName}' EnableState changed from '{FeatureState}' to '{FeatureState}'",
                             featureState.Id, featureState.EnableState, value);
            }

            return Task.CompletedTask;
        }

        public Task UpdateInstalledStateAsync(ShellFeatureState featureState, ShellFeatureState.State value)
        {
            if (Logger.IsEnabled(LogLevel.Debug))
            {
                Logger.LogDebug("Feature '{FeatureName}' InstallState changed from '{FeatureState}' to '{FeatureState}'", featureState.Id, featureState.InstallState, value);
            }

            return Task.CompletedTask;
        }
    }
}
