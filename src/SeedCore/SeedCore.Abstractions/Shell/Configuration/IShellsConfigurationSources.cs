using Microsoft.Extensions.Configuration;

namespace SeedCore.Shell.Configuration
{
    public interface IShellsConfigurationSources
    {
        void AddSources(IConfigurationBuilder builder);
    }

    public static class ShellsConfigurationSourcesExtensions
    {
        public static IConfigurationBuilder AddSources(this IConfigurationBuilder builder, IShellsConfigurationSources sources)
        {
            sources.AddSources(builder);
            return builder;
        }
    }
}
