using Microsoft.Extensions.DependencyInjection;
using Seed.Environment.Engine.Descriptors;
using System;
using System.Collections.Generic;
using System.Text;

namespace Seed.Environment.Engine.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddAllFeaturesDescriptor(this IServiceCollection services)
        {
            services.AddScoped<IEngineDescriptorManager, AllFeaturesEngineDescriptorManager>();

            return services;
        }

        public static IServiceCollection AddSetFeaturesDescriptor(this IServiceCollection services, IEnumerable<EngineFeature> features)
        {
            services.AddSingleton<IEngineDescriptorManager>(new SetFeaturesEngineDescriptorManager(features));

            return services;
        }
    }
}
