using Microsoft.AspNetCore.Mvc;
using Seed.Environment.Engine;
using SeedModules.AngularUI.Models;
using SeedModules.AngularUI.Rendering;
using System;
using System.Collections.Generic;
using System.Text;

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
