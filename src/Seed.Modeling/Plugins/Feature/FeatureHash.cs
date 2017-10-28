using Microsoft.Extensions.Caching.Memory;
using Seed.Environment.Cache;
using Seed.Environment.Engine;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Seed.Plugins.Feature
{
    public class FeatureHash : IFeatureHash
    {
        private const string FeatureHashCacheKey = "FeatureHash:Features";

        private readonly IEngineFeaturesManager _featureManager;
        private readonly IMemoryCache _memoryCache;
        private readonly ISignal _signal;

        public FeatureHash(IEngineFeaturesManager featureManager, IMemoryCache memoryCache, ISignal signal)
        {
            _featureManager = featureManager;
            _memoryCache = memoryCache;
            _signal = signal;
        }

        public async Task<int> GetFeatureHashAsync()
        {
            if (_memoryCache.TryGetValue(FeatureHashCacheKey, out int serial))
            {
                return serial;
            }

            var enabledFeatures = await _featureManager.GetEnabledFeaturesAsync();
            serial = enabledFeatures
                .OrderBy(x => x.Id)
                .Aggregate(0, (a, f) => a * 7 + f.Id.GetHashCode());

            var options = new MemoryCacheEntryOptions()
                .AddExpirationToken(_signal.GetToken(FeaturesProvider.FeatureProviderCacheKey));

            _memoryCache.Set(FeatureHashCacheKey, serial, options);

            return serial;
        }

        public async Task<int> GetFeatureHashAsync(string featureId)
        {
            var cacheKey = string.Format("{0}:{1}", FeatureHashCacheKey, featureId);
            bool enabled;
            if (!_memoryCache.TryGetValue(cacheKey, out enabled))
            {
                var enabledFeatures = await _featureManager.GetEnabledFeaturesAsync();
                enabled =
                    enabledFeatures
                        .Any(x => x.Id.Equals(featureId));

                var options = new MemoryCacheEntryOptions()
                    .AddExpirationToken(_signal.GetToken(FeaturesProvider.FeatureProviderCacheKey));

                _memoryCache.Set(cacheKey, enabled, options);
            }

            return enabled ? 1 : 0;
        }
    }
}