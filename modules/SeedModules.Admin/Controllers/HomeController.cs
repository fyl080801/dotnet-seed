using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Seed.Environment.Engine;
using Seed.Modules.Site;
using Seed.Mvc.Filters;
using SeedModules.AngularUI.Models;
using SeedModules.AngularUI.Rendering;

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
        public IActionResult Login(string returnUrl = null)
        {
            return View("~/SeedModules.AngularUI/Views/Home/Index.cshtml", new ViewOptionsModel()
            {
                Options = _optionsBuilder.Build(RouteData).Result,
                SiteSettings = _siteSettingsBuilder.Build().ToString()
            });
        }

        [Authorize]
        [GenerateAntiforgeryTokenCookie]
        public IActionResult Index()
        {
            return View("~/SeedModules.AngularUI/Views/Home/Index.cshtml", new ViewOptionsModel()
            {
                Options = _optionsBuilder.Build(RouteData).Result,
                SiteSettings = _siteSettingsBuilder.Build().ToString()
            });
        }
    }
}
