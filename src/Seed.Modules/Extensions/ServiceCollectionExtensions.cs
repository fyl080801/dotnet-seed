using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Seed.Environment.Engine.Descriptors;
using Seed.Environment.Engine.Extensions;
using Seed.Modules.DeferredTasks;
using Seed.Plugins.Extensions;
using System;
using System.Linq;

namespace Seed.Modules.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddModules(this IServiceCollection services, Action<ModuleServiceCollection> configure = null)
        {
            services.AddWebHost();
            services.AddDescriptorDefinition("Module.txt", "module");
            services.AddPluginLocation("modules");

            var moduleServices = new ModuleServiceCollection(services);

            moduleServices.Configure(internalServices => internalServices.AddAllFeaturesDescriptor());

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

        public static ModuleServiceCollection WithDefaultFeatures(this ModuleServiceCollection modules, params string[] featureIds)
        {
            modules.Configure(services =>
            {
                foreach (var featureId in featureIds)
                {
                    services.AddTransient(sp => new EngineFeature(featureId));
                };
            });

            return modules;
        }

        public static ModuleServiceCollection WithFeatures(this ModuleServiceCollection modules,
            params string[] featureIds)
        {
            var featuresList = featureIds.Select(featureId => new EngineFeature(featureId)).ToList();

            modules.Configure(services =>
            {
                foreach (var feature in featuresList)
                {
                    services.AddTransient(sp => feature);
                };

                services.AddSetFeaturesDescriptor(featuresList);
            });

            return modules;
        }

        public static IServiceCollection AddWebHost(this IServiceCollection services)
        {
            services.AddLogging();
            services.AddOptions();
            services.AddLocalization();
            services.AddEngineHostServices();
            services.AddPluginServices();

            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddScoped<IModuleLauncherRouteBuilder, ModuleLauncherRouteBuilder>();
            return services;
        }

        public static IServiceCollection AddDeferredTasks(this IServiceCollection services)
        {
            services.TryAddScoped<IDeferredTaskEngine, DeferredTaskEngine>();
            services.TryAddScoped<IDeferredTaskState, HttpContextTaskState>();
            return services;
        }
    }
}
