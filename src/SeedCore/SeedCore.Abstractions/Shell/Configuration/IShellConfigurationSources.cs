using Microsoft.Extensions.Configuration;
using System.Collections.Generic;

namespace SeedCore.Shell.Configuration
{
    public interface IShellConfigurationSources
    {
        void AddSources(string tenant, IConfigurationBuilder builder);
        void Save(string tenant, IDictionary<string, string> data);
    }

    public static class ShellConfigurationSourcesExtensions
    {
        public static IConfigurationBuilder AddSources(this IConfigurationBuilder builder, string tenant, IShellConfigurationSources sources)
        {
            sources.AddSources(tenant, builder);
            return builder;
        }
    }
}
