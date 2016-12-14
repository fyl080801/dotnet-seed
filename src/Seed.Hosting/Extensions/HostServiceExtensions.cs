using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Seed.Environment.Engine;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Seed.Hosting.Extensions
{
    public static class HostServiceExtensions
    {
        public static IServiceCollection AddHost(this IServiceCollection services, Action<IServiceCollection> additionalDependencies)
        {
            additionalDependencies(services);
            return services;
        }

        public static IServiceCollection AddHostCore(this IServiceCollection services)
        {
            services.AddSingleton<SeedHost>();
            services.AddSingleton<IHost>(sp => sp.GetRequiredService<SeedHost>());

            services.TryAddSingleton<IEngineManager, SingleEngineManager>();

            services.AddSingleton<IEngineDescriptorManager, AllPluginsDescriptorManager>();
            services.AddSingleton<IEngineContextFactory, EngineContextFactory>();
            services.AddSingleton<IEngineContainerFactory, EngineContainerFactory>();
            services.AddSingleton<IEngineRunningTable, EngineRunningTable>();

            return services;
        }
    }
}
