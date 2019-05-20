using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using Seed.Environment.Engine;
using Seed.Environment.Engine.Configuration;
using Seed.Environment.Engine.Descriptor;
using Seed.Environment.Engine.Descriptor.Models;
using Seed.Environment.Engine.Descriptor.Settings;
using Seed.Modules.Builder;
using Seed.Modules.DeferredTasks;

namespace Seed.Modules.Extensions
{
    public static class SeedBuilderExtensions
    {
        public static SeedBuilder AddGlobalFeatures(this SeedBuilder builder, params string[] featureIds)
        {
            foreach (var featureId in featureIds)
            {
                builder.ApplicationServices.AddTransient(sp => new EngineFeature(featureId, alwaysEnabled: true));
            }

            return builder;
        }

        public static SeedBuilder AddTenantFeatures(this SeedBuilder builder, params string[] featureIds)
        {
            builder.ConfigureServices(services =>
            {
                foreach (var featureId in featureIds)
                {
                    services.AddTransient(sp => new EngineFeature(featureId, alwaysEnabled: true));
                }
            });

            return builder;
        }

        public static SeedBuilder AddSetupFeatures(this SeedBuilder builder, params string[] featureIds)
        {
            foreach (var featureId in featureIds)
            {
                builder.ApplicationServices.AddTransient(sp => new EngineFeature(featureId));
            }

            return builder;
        }

        public static SeedBuilder WithTenants(this SeedBuilder builder)
        {
            var services = builder.ApplicationServices;

            services.AddSingleton<IEnginesSettingsSources, EnginesSettingsSources>();
            services.AddSingleton<IEnginesConfigurationSources, EnginesConfigurationSources>();
            services.AddSingleton<IEngineConfigurationSources, EngineConfigurationSources>();
            services.AddScoped<IEngineDescriptorManager, ConfiguredFeaturesEngineDescriptorManager>();
            services.AddTransient<IConfigureOptions<EngineOptions>, EngineOptionsSetup>();
            services.AddSingleton<IEngineSettingsManager, EngineSettingsManager>();

            return builder;
        }

        public static SeedBuilder WithFeatures(this SeedBuilder builder, params string[] featureIds)
        {
            foreach (var featureId in featureIds)
            {
                builder.ApplicationServices.AddTransient(sp => new EngineFeature(featureId));
            }

            builder.ApplicationServices.AddSetFeaturesDescriptor();

            return builder;
        }

        public static SeedBuilder AddBackgroundService(this SeedBuilder builder)
        {
            builder.ApplicationServices.AddSingleton<IHostedService, ModuleBackgroundService>();

            return builder;
        }
    }
}
