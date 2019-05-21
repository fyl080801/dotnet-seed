using Microsoft.Extensions.Caching.Distributed;
using Microsoft.Extensions.Caching.Memory;
using SeedCore;
using SeedCore.Infrastructure.Cache;
using SeedCore.Infrastructure.Cache.CacheContextProviders;

namespace Microsoft.Extensions.DependencyInjection
{
    public static partial class SeedCoreBuilderExtensions
    {
        public static SeedCoreBuilder AddCaching(this SeedCoreBuilder builder)
        {
            builder.ConfigureServices(services =>
            {
                // services.AddTransient<ITagCache, DefaultTagCache>();
                services.AddSingleton<ISignal, Signal>();
                services.AddScoped<ICacheContextManager, CacheContextManager>();
                services.AddScoped<ICacheScopeManager, CacheScopeManager>();

                services.AddScoped<ICacheContextProvider, FeaturesCacheContextProvider>();
                services.AddScoped<ICacheContextProvider, QueryCacheContextProvider>();
                services.AddScoped<ICacheContextProvider, RolesCacheContextProvider>();
                services.AddScoped<ICacheContextProvider, RouteCacheContextProvider>();
                services.AddScoped<ICacheContextProvider, UserCacheContextProvider>();
                services.AddScoped<ICacheContextProvider, KnownValueCacheContextProvider>();

                // IMemoryCache is registered at the tenant level so that there is one instance for each tenant.
                services.AddSingleton<IMemoryCache, MemoryCache>();

                // MemoryDistributedCache needs to be registered as a singleton as it owns a MemoryCache instance.
                services.AddSingleton<IDistributedCache, MemoryDistributedCache>();
            });

            return builder;
        }
    }
}