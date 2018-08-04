using Microsoft.AspNetCore.Mvc;
using SeedModules.AngularUI.Filters;
using SeedModules.AngularUI.Models;
using SeedModules.AngularUI.Rendering;

namespace SeedModules.Setup.Controllers
{
    public class HomeController : Controller
    {
        readonly IViewOptionsBuilder _optionsBuilder;
        readonly ISiteSettingsBuilder _siteSettingsBuilder;

        public HomeController(
            IViewOptionsBuilder optionsBuilder,
            ISiteSettingsBuilder siteSettingsBuilder)
        {
            _optionsBuilder = optionsBuilder;
            _siteSettingsBuilder = siteSettingsBuilder;
        }

        [RouteRequires("/SeedModules.Setup/modules/module")]
        public IActionResult Index()
        {
            return View(".Modules/SeedModules.AngularUI/Views/Home/Index.cshtml", new ViewOptionsModel()
            {
                Options = _optionsBuilder.Build(ControllerContext, RouteData).Result,
                SiteSettings = _siteSettingsBuilder.Build().ToString()
            });
        }
    }
}
