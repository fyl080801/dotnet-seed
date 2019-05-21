using Microsoft.Extensions.DependencyInjection;
using SeedCore.Shell.Builders;
using System;
using System.Threading.Tasks;

namespace SeedCore.Shell
{
    public static class ShellHostExtensions
    {
        public static ShellSettings GetSettings(this IShellHost shellHost, string name)
        {
            if (!shellHost.TryGetSettings(name, out ShellSettings settings))
            {
                throw new ArgumentException("The specified tenant name is not valid.", nameof(name));
            }

            return settings;
        }

        public static async Task<IServiceScope> GetScopeAsync(this IShellHost shellHost, string tenant)
        {
            return (await shellHost.GetScopeAndContextAsync(shellHost.GetSettings(tenant))).Scope;
        }

        public static Task<(IServiceScope Scope, ShellContext ShellContext)> GetScopeAndContextAsync(this IShellHost shellHost, string tenant)
        {
            return shellHost.GetScopeAndContextAsync(shellHost.GetSettings(tenant));
        }

        public static async Task<IServiceScope> TryGetScopeAsync(this IShellHost shellHost, string tenant)
        {
            if (!shellHost.TryGetSettings(tenant, out var settings))
            {
                return null;
            }

            return (await shellHost.GetScopeAndContextAsync(settings)).Scope;
        }

        public static Task<(IServiceScope Scope, ShellContext ShellContext)> TryGetScopeAndContextAsync(this IShellHost shellHost, string tenant)
        {
            if (!shellHost.TryGetSettings(tenant, out var settings))
            {
                IServiceScope scope = null;
                ShellContext shell = null;
                return Task.FromResult((scope, shell));
            }

            return shellHost.GetScopeAndContextAsync(settings);
        }
    }
}
