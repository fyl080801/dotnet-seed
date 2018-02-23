using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Seed.Environment.Engine;
using Seed.Mvc.Filters;
using SeedModules.AngularUI.Models;
using SeedModules.AngularUI.Rendering;

namespace SeedModules.Admin.Controllers
{
    public class HomeController : Controller
    {
        readonly IViewOptionsBuilder _optionsBuilder;
        readonly EngineSettings _engineSettings;

        public HomeController(IViewOptionsBuilder optionsBuilder, EngineSettings engineSettings)
        {
            _optionsBuilder = optionsBuilder;
            _engineSettings = engineSettings;
        }

        [GenerateAntiforgeryTokenCookie]
        public IActionResult Login(string returnUrl = null)
        {
            return View("~/SeedModules.AngularUI/Views/Home/Index.cshtml", new ViewOptionsModel()
            {
                Options = _optionsBuilder.Build(RouteData).Result,
                Prefix = _engineSettings.RequestUrlPrefix
            });
        }

        [Authorize]
        [GenerateAntiforgeryTokenCookie]
        public IActionResult Index()
        {
            return View("~/SeedModules.AngularUI/Views/Home/Index.cshtml", new ViewOptionsModel()
            {
                Options = _optionsBuilder.Build(RouteData).Result,
                Prefix = _engineSettings.RequestUrlPrefix
            });
        }
    }
}
