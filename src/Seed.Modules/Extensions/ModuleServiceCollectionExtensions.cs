using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Seed.Environment.Engine.Extensions;
using Seed.Modules.Abstractions;
using System;
using System.Collections.Generic;
using System.Text;

namespace Seed.Modules.Extensions
{
    public static class ModuleServiceCollectionExtensions
    {
        public static IServiceCollection AddModules(this IServiceCollection services, Action<ModuleServiceCollection> configure = null)
        {
            services.AddWebHost();

            var moduleServices = new ModuleServiceCollection(services);
            configure?.Invoke(moduleServices);
            services.AddSingleton(_ => services);
            return services;
        }

        public static ModuleServiceCollection WithConfiguration(this ModuleServiceCollection modules, IConfiguration configuration)
        {
            if (configuration != null)
            {
                modules.Configure(services => services.AddSingleton(configuration));
            }
            return modules;
        }

        public static IServiceCollection AddWebHost(this IServiceCollection services)
        {
            services.AddLogging();
            services.AddOptions();
            services.AddLocalization();
            services.AddHostingEngineServices();

            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddScoped<IModuleLauncherRouteBuilder, ModuleLauncherRouteBuilder>();
            return services;
        }
    }
}
