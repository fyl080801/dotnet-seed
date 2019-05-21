using Microsoft.Extensions.DependencyInjection;
using SeedCore.Shell.Builders;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SeedCore.Shell
{
    public interface IShellHost
    {
        Task InitializeAsync();

        Task<ShellContext> GetOrCreateShellContextAsync(ShellSettings settings);

        Task<IServiceScope> GetScopeAsync(ShellSettings settings);

        Task<(IServiceScope Scope, ShellContext ShellContext)> GetScopeAndContextAsync(ShellSettings settings);
        
        Task UpdateShellSettingsAsync(ShellSettings settings);

        Task ReloadShellContextAsync(ShellSettings settings);

        Task<ShellContext> CreateShellContextAsync(ShellSettings settings);

        IEnumerable<ShellContext> ListShellContexts();

        bool TryGetSettings(string name, out ShellSettings settings);

        IEnumerable<ShellSettings> GetAllSettings();
    }
}