using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SeedCore.Infrastructure.Cache.CacheContextProviders
{
    /// <summary>
    /// Adds all context values as they are to the cache entries. This allows for known value variation
    /// </summary>
    public class KnownValueCacheContextProvider : ICacheContextProvider
    {
        public Task PopulateContextEntriesAsync(IEnumerable<string> contexts, List<CacheContextEntry> entries)
        {
            entries.Add(new CacheContextEntry("", String.Join(",", contexts)));

            return Task.CompletedTask;
        }
    }
}