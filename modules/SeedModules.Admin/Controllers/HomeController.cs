using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using Seed.Environment.Engine;
using Seed.Mvc.Filters;
using Seed.Security.Permissions;
using SeedModules.AngularUI.Extensions;
using SeedModules.AngularUI.Filters;
using SeedModules.AngularUI.Models;
using SeedModules.AngularUI.Rendering;
using System.Linq;

namespace SeedModules.Admin.Controllers
{
    public class HomeController : Controller
    {
        readonly IViewOptionsBuilder _optionsBuilder;
        readonly EngineSettings _engineSettings;
        readonly ISiteSettingsBuilder _siteSettingsBuilder;

        public HomeController(IViewOptionsBuilder optionsBuilder, EngineSettings engineSettings, ISiteSettingsBuilder siteSettingsBuilder)
        {
            _optionsBuilder = optionsBuilder;
            _engineSettings = engineSettings;
            _siteSettingsBuilder = siteSettingsBuilder;
        }

        [GenerateAntiforgeryTokenCookie]
        [RouteRequires("rcss!/SeedModules.Admin/less/seed-admin.css", "/SeedModules.Admin/modules/login/module")]
        public IActionResult Login(string returnUrl = null)
        {
            return this.UI();
        }

        [Authorize]
        [GenerateAntiforgeryTokenCookie]
        [RouteRequires("rcss!/SeedModules.Admin/less/seed-admin.css", "/SeedModules.Admin/modules/admin/module")]
        public IActionResult Index()
        {
            var model = new ViewOptionsModel()
            {
                Options = _optionsBuilder.Build(ControllerContext, RouteData).Result,
                SiteSettings = _siteSettingsBuilder.Build().ToString()
            };
            model.Properties.Add("Permissions", new JArray(User.Claims.Where(e => e.Type == PermissionInfo.ClaimType).Select(e => e.Value).ToArray()));
            return this.UI(model);
        }
    }
}
