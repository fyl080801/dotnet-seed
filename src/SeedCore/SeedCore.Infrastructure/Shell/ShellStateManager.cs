using SeedCore.Shell.State;
using System.Threading.Tasks;

namespace SeedCore.Shell
{
    public class ShellStateManager : IShellStateManager
    {
        public Task<ShellState> GetShellStateAsync()
        {
            throw new System.NotImplementedException();
        }

        public Task UpdateEnabledStateAsync(ShellFeatureState featureState, ShellFeatureState.State value)
        {
            throw new System.NotImplementedException();
        }

        public Task UpdateInstalledStateAsync(ShellFeatureState featureState, ShellFeatureState.State value)
        {
            throw new System.NotImplementedException();
        }
    }
}
