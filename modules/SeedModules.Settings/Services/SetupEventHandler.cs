using Seed.Modules.Setup.Events;
using Seed.Mvc.Settings;
using System;
using System.Threading.Tasks;

namespace SeedModules.Settings.Services
{
    public class SetupEventHandler : ISetupEventHandler
    {
        readonly ISiteService _siteService;

        public SetupEventHandler(ISiteService siteService)
        {
            _siteService = siteService;
        }

        public async Task SetupAsync(
            string siteName,
            string userName,
            string email,
            string password,
            string dbProvider,
            string dbConnectionString,
            string dbTablePrefix,
            Action<string, string> errors)
        {
            var siteInfo = await _siteService.GetSiteInfoAsync();
            siteInfo.SiteName = siteName;
            siteInfo.SuperUser = userName;
            await _siteService.UpdateSiteInfoAsync(siteInfo);
        }
    }
}
