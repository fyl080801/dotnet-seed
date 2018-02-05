using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;

namespace Seed.Environment.Caching.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddCaching(this IServiceCollection services)
        {
            services.AddSingleton<ISignal, Signal>();
            services.AddSingleton<IMemoryCache, MemoryCache>();

            return services;
        }
    }
}
