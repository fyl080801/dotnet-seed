using Microsoft.Extensions.DependencyInjection;
using Seed.Plugin.Abstractions;
using Seed.Plugin.Abstractions.Feature;
using Seed.Plugin.Feature;
using System;
using System.Collections.Generic;
using System.Text;

namespace Seed.Plugin.Extensions
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
