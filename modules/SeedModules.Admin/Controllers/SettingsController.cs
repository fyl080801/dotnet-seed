using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Seed.Mvc.Filters;
using Seed.Mvc.Settings;
using SeedModules.Admin.Domain;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace SeedModules.Admin.Controllers
{
    [Route("api/settings")]
    [Authorize]
    public class SettingsController : Controller
    {
        readonly ISiteService _siteService;

        public SettingsController(ISiteService siteService)
        {
            _siteService = siteService;
        }

        [HttpGet, HandleResult]
        public async Task<ISiteInfo> Load()
        {
            var settings = await _siteService.GetSiteInfoAsync();

            return settings;
        }

        [HttpPatch, HandleResult]
        public async Task Save([FromBody]SiteSettings settings)
        {
            var old = await _siteService.GetSiteInfoAsync();

            old.SiteName = settings.SiteName;
            old.HomeRoute = settings.HomeRoute;

            await _siteService.UpdateSiteInfoAsync(old);
        }
    }
}
