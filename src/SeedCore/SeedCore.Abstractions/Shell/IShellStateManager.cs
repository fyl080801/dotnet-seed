using SeedCore.Shell.State;
using System.Threading.Tasks;

namespace SeedCore.Shell
{
    public interface IShellStateManager
    {
        Task<ShellState> GetShellStateAsync();
        Task UpdateEnabledStateAsync(ShellFeatureState featureState, ShellFeatureState.State value);
        Task UpdateInstalledStateAsync(ShellFeatureState featureState, ShellFeatureState.State value);
    }
}
