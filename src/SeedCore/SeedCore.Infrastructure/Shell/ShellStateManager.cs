using Microsoft.Extensions.Logging;
using SeedCore.Shell.State;
using System.Linq;
using System.Threading.Tasks;

namespace SeedCore.Shell
{
    /// <summary>
    /// Stores <see cref="ShellState"/> in the database. 
    /// </summary>
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
