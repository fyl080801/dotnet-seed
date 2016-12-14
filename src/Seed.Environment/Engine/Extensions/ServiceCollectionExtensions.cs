using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Seed.Environment.Engine.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddAllPluginDescriptor(this IServiceCollection services)
        {
            services.AddScoped<IEngineDescriptorManager, AllPluginsDescriptorManager>();

            return services;
        }
    }
}
