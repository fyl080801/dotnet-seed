using Microsoft.Extensions.DependencyInjection;
using Seed.Environment.Engine.Descriptors;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Seed.Environment.Engine.Data
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddSitesFolder(this IServiceCollection services, string rootPath, string sitesPath)
        {
            services.Configure<EngineOptions>(options =>
            {
                options.RootContainerName = rootPath;
                options.ContainerName = sitesPath;
            });

            services.AddSingleton<IEngineSettingsConfigurationProvider, EngineSettingsConfigurationProvider>();
            services.AddSingleton<IEngineSettingsManager, EngineSettingsManager>();

            return services;
        }

        public static IServiceCollection AddEngineDescriptorStorage(this IServiceCollection services)
        {
            services.AddScoped<IEngineDescriptorManager, EngineDescriptorManager>();
            services.AddScoped<IEngineStateManager, EngineStateManager>();
            services.AddScoped<IEngineFeaturesManager, EngineFeaturesManager>();
            services.AddScoped<IEngineDescriptorFeaturesManager, EngineDescriptorFeaturesManager>();

            return services;
        }
    }
}
