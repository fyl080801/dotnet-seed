using Seed.Environment.Engine;
using Seed.Mvc.Settings;
using SeedModules.AngularUI.Rendering;
using System;
using System.Collections.Generic;
using System.Text;

namespace SeedModules.Admin.Rendering
{
    public class SiteSettingsBuilder : ISiteSettingsBuilder
    {
        readonly EngineSettings _engineSettings;
        readonly ISiteService _siteService;

        public SiteSettingsBuilder(EngineSettings engineSettings, ISiteService siteService)
        {
            _engineSettings = engineSettings;
            _siteService = siteService;
        }

        public ISiteSettingsContext Build()
        {
            var siteSettings = _siteService.GetSiteInfoAsync().GetAwaiter().GetResult();
            return new SiteSettingsContext()
            {
                Prefix = _engineSettings.RequestUrlPrefix,
                BaseUrl = siteSettings.BaseUrl,
                PageCounts = siteSettings.PageCounts,
                PageSize = siteSettings.PageSize,
                SiteName = siteSettings.SiteName
            };
        }
    }
}
