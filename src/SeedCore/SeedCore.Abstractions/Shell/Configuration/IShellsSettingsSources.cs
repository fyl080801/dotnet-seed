using Microsoft.Extensions.Configuration;
using System.Collections.Generic;

namespace SeedCore.Shell.Configuration
{
    public interface IShellsSettingsSources
    {
        void AddSources(IConfigurationBuilder builder);
        void Save(string tenant, IDictionary<string, string> data);
    }

    public static class ShellsSettingsSourcesExtensions
    {
        public static IConfigurationBuilder AddSources(this IConfigurationBuilder builder, IShellsSettingsSources sources)
        {
            sources.AddSources(builder);
            return builder;
        }
    }
}
