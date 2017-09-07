using Microsoft.Extensions.DependencyInjection;
using Seed.Plugins.Feature;
using System;
using System.Collections.Generic;
using System.Text;

namespace Seed.Plugins.Extensions
{
    public static class PluginServiceCollectionExtensions
    {
        public static IServiceCollection AddPluginServices(this IServiceCollection services)
        {
            services.AddSingleton<IPluginManager, PluginManager>();

            services.AddSingleton<ITypeFeatureProvider, TypeFeatureProvider>();

            return services;
        }
    }
}
