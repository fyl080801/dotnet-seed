using Microsoft.Extensions.Options;
using SeedCore.Infrastructure.Shell;
using SeedCore.Shell;
using SeedCore.Shell.Configuration;
using SeedCore.Shell.Descriptor;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class ShellSeedCoreBuilderExtensions
    {
        public static SeedCoreBuilder AddDataStorage(this SeedCoreBuilder builder)
        {
            builder.AddSitesFolder()
                .ConfigureServices(services =>
                {
                    services.AddScoped<IShellDescriptorManager, ShellDescriptorManager>();
                    services.AddScoped<IShellStateManager, ShellStateManager>();
                    services.AddScoped<IShellFeaturesManager, ShellFeaturesManager>();
                    services.AddScoped<IShellDescriptorFeaturesManager, ShellDescriptorFeaturesManager>();
                });

            return builder;
        }

        public static SeedCoreBuilder AddSitesFolder(this SeedCoreBuilder builder)
        {
            var services = builder.ApplicationServices;

            services.AddSingleton<IShellsSettingsSources, ShellsSettingsSources>();
            services.AddSingleton<IShellsConfigurationSources, ShellsConfigurationSources>();
            services.AddSingleton<IShellConfigurationSources, ShellConfigurationSources>();
            services.AddTransient<IConfigureOptions<ShellOptions>, ShellOptionsSetup>();
            services.AddSingleton<IShellSettingsManager, ShellSettingsManager>();

            return builder;
        }
    }
}