using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.DependencyInjection;
using Seed.Modules.Builder;
using System;
using System.Collections.Generic;
using System.Text;

namespace Seed.Environment.Caching.Extensions
{
    public static class SeedBuilderExtensions
    {
        public static SeedBuilder AddCaching(this SeedBuilder builder)
        {
            builder.ConfigureServices(services =>
            {
                services.AddSingleton<ISignal, Signal>();
                services.AddSingleton<IMemoryCache, MemoryCache>();
            });

            return builder;
        }

    }
}