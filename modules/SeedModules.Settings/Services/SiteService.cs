using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Primitives;
using Seed.Data;
using Seed.Environment.Cache;
using Seed.Modules.Site;
using SeedModules.Settings.Domain;
using System;
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
                site = await dbContext.Context.Set<SiteSettings>().FirstOrDefaultAsync();
                if (site == null)
                {
                    lock (_memoryCache)
                    {
                        if (!_memoryCache.TryGetValue(SiteCacheKey, out site))
                        {
                            dbContext.Context.Add(new SiteSettings
                            {
                                SiteName = "Seed Application"
                            });

                            dbContext.SaveChanges();
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

            var existing = await dbContext.Context.Set<SiteSettings>().FirstOrDefaultAsync();

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
