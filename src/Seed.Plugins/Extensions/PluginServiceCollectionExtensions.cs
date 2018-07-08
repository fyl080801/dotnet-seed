using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Options;
using Seed.Plugins.Descriptors;
using Seed.Plugins.Feature;
using Seed.Plugins.Loader;

namespace Seed.Plugins.Extensions
{
    public static class PluginServiceCollectionExtensions
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
