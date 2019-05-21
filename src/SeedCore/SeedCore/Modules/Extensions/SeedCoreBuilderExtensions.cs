using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using SeedCore.Modules;
using SeedCore.Shell;
using SeedCore.Shell.Configuration;
using SeedCore.Shell.Descriptor;
using SeedCore.Shell.Descriptor.Models;
using SeedCore.Shell.Descriptor.Settings;

namespace Microsoft.Extensions.DependencyInjection
{
    public static partial class SeedCoreBuilderExtensions
    {
        /// <summary>
        /// Registers at the host level a set of features which are always enabled for any tenant.
        /// </summary>
        public static SeedCoreBuilder AddGlobalFeatures(this SeedCoreBuilder builder, params string[] featureIds)
        {
            foreach (var featureId in featureIds)
            {
                builder.ApplicationServices.AddTransient(sp => new ShellFeature(featureId, alwaysEnabled: true));
            }

            return builder;
        }

        /// <summary>
        /// Registers at the tenant level a set of features which are always enabled.
        /// </summary>
        public static SeedCoreBuilder AddTenantFeatures(this SeedCoreBuilder builder, params string[] featureIds)
        {
            builder.ConfigureServices(services =>
            {
                foreach (var featureId in featureIds)
                {
                    services.AddTransient(sp => new ShellFeature(featureId, alwaysEnabled: true));
                }
            });

            return builder;
        }

        /// <summary>
        /// Registers a default tenant with a set of features that are used to setup and configure the actual tenants.
        /// For instance you can use this to add a custom Setup module.
        /// </summary>
        public static SeedCoreBuilder AddSetupFeatures(this SeedCoreBuilder builder, params string[] featureIds)
        {
            foreach (var featureId in featureIds)
            {
                builder.ApplicationServices.AddTransient(sp => new ShellFeature(featureId));
            }

            return builder;
        }

        /// <summary>
        /// Registers tenants defined in configuration.
        /// </summary>
        public static SeedCoreBuilder WithTenants(this SeedCoreBuilder builder)
        {
            var services = builder.ApplicationServices;

            services.AddSingleton<IShellsSettingsSources, ShellsSettingsSources>();
            services.AddSingleton<IShellsConfigurationSources, ShellsConfigurationSources>();
            services.AddSingleton<IShellConfigurationSources, ShellConfigurationSources>();
            services.AddScoped<IShellDescriptorManager, ConfiguredFeaturesShellDescriptorManager>();
            services.AddTransient<IConfigureOptions<ShellOptions>, ShellOptionsSetup>();
            services.AddSingleton<IShellSettingsManager, ShellSettingsManager>();

            return builder;
        }

        /// <summary>
        /// Registers a single tenant with the specified set of features.
        /// </summary>
        public static SeedCoreBuilder WithFeatures(this SeedCoreBuilder builder, params string[] featureIds)
        {
            foreach (var featureId in featureIds)
            {
                builder.ApplicationServices.AddTransient(sp => new ShellFeature(featureId));
            }

            builder.ApplicationServices.AddSetFeaturesDescriptor();

            return builder;
        }

        /// <summary>
        /// Registers and configures a background hosted service to manage tenant background tasks.
        /// </summary>
        public static SeedCoreBuilder AddBackgroundService(this SeedCoreBuilder builder)
        {
            builder.ApplicationServices.AddSingleton<IHostedService, ModularBackgroundService>();

            return builder;
        }
    }
}
