using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Options;
using Seed.Environment.Engine.Builder;
using Seed.Environment.Engine.Descriptors;

namespace Seed.Environment.Engine.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddHostingEngineServices(this IServiceCollection services)
        {
            services.AddSingleton<EngineHost>();
            services.AddSingleton<IEngineHost>(sp => sp.GetRequiredService<EngineHost>());
            services.AddSingleton<IEngineDescriptorManagerEventHandler>(sp => sp.GetRequiredService<EngineHost>());
            {
                services.TryAddSingleton<IEngineSettingsManager, SingleEngineSettingsManager>();
                services.AddTransient<IConfigureOptions<EngineOptions>, EngineOptionsSetup>();

                services.AddSingleton<IEngineContextFactory, EngineContextFactory>();
                {
                    services.AddSingleton<ICompositionStrategy, CompositionStrategy>();

                    services.AddSingleton<IEngineContainerFactory, EngineContainerFactory>();
                }
            }

            services.AddSingleton<IRunningEngineTable, RunningEngineTable>();

            return services;
        }

        public static IServiceCollection AddAllFeaturesDescriptor(this IServiceCollection services)
        {
            services.AddScoped<IEngineDescriptorManager, AllFeaturesEngineDescriptorManager>();

            return services;
        }

        public static IServiceCollection AddSetFeaturesDescriptor(this IServiceCollection services)
        {
            services.AddSingleton<IEngineDescriptorManager>(sp =>
            {
                var shellFeatures = sp.GetServices<EngineFeature>();
                return new SetFeaturesEngineDescriptorManager(shellFeatures);
            });

            return services;
        }
    }
}
