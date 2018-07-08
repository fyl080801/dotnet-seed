using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Seed.Plugins.Features;

namespace Seed.Plugins
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddPluginManagerHost(this IServiceCollection services)
        {
            services.AddSingleton<IPluginManager, PluginManager>();
            {
                services.AddSingleton<ITypeFeatureProvider, TypeFeatureProvider>();
                services.AddSingleton<IFeaturesProvider, FeaturesProvider>();
                services.AddSingleton<IPluginDependencyStrategy, PluginDependencyStrategy>();
                services.AddSingleton<IPluginPriorityStrategy, PluginPriorityStrategy>();
            }

            return services;
        }

        public static IServiceCollection AddPluginManager(this IServiceCollection services)
        {
            services.TryAddTransient<IFeatureHash, FeatureHash>();

            return services;
        }
    }
}