using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Primitives;
using Seed.Data;
using Seed.Environment.Caching;
using Seed.Modules.Site;
using SeedModules.Settings.Domain;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace SeedModules.Settings.Services
{
    public class SiteService : ISiteService
    {
        const string SiteCacheKey = "SiteService";

        readonly IMemoryCache _memoryCache;
        readonly ISignal _signal;
        readonly IServiceProvider _serviceProvider;

        public SiteService(IMemoryCache memoryCache, ISignal signal, IServiceProvider serviceProvider)
        {
            _memoryCache = memoryCache;
            _signal = signal;
            _serviceProvider = serviceProvider;
        }

        public IChangeToken ChangeToken => _signal.GetToken(SiteCacheKey);

        public async Task<ISiteInfo> GetSiteInfoAsync()
        {
            if (!_memoryCache.TryGetValue(SiteCacheKey, out ISiteInfo site))
            {
                var dbContext = GetDbContext();
                var siteSettingsSet = dbContext.Set<SiteSettings>();
                site = await Task.FromResult(siteSettingsSet.FirstOrDefault());
                if (site == null)
                {
                    lock (_memoryCache)
                    {
                        if (!_memoryCache.TryGetValue(SiteCacheKey, out site))
                        {
                            var siteSettings = new SiteSettings
                            {
                                SiteName = "Seed Application"
                            };
                            siteSettingsSet.Add(siteSettings);

                            dbContext.SaveChanges();

                            site = siteSettings;

                            _memoryCache.Set(SiteCacheKey, site);
                            _signal.SignalToken(SiteCacheKey);
                        }
                    }
                }
                else
                {
                    _memoryCache.Set(SiteCacheKey, site);
                    _signal.SignalToken(SiteCacheKey);
                }
            }

            return site;
        }

        public async Task UpdateSiteInfoAsync(ISiteInfo site)
        {
            var dbContext = GetDbContext();
            var siteSettingsSet = dbContext.Set<SiteSettings>();
            var existing = await Task.FromResult(siteSettingsSet.FirstOrDefault());

            existing.BaseUrl = site.BaseUrl;
            existing.SiteName = site.SiteName;
            existing.SuperUser = site.SuperUser;

            dbContext.SaveChanges();

            _memoryCache.Set(SiteCacheKey, site);
            _signal.SignalToken(SiteCacheKey);

            return;
        }

        private IDbContext GetDbContext()
        {
            return _serviceProvider.GetService<IHttpContextAccessor>().HttpContext.RequestServices.GetService<IDbContext>();
        }
    }
}
