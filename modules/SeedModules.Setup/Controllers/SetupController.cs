using Microsoft.AspNetCore.Mvc;
using Seed.Environment.Engine;
using SeedModules.AngularUI.Models;
using SeedModules.AngularUI.Rendering;
using System;
using System.Collections.Generic;
using System.Text;

namespace SeedModules.Setup.Controllers
{
    public class SetupController : Controller
    {
        readonly IViewOptionsBuilder _optionsBuilder;
        readonly EngineSettings _engineSettings;

        public SetupController(IViewOptionsBuilder optionsBuilder, EngineSettings engineSettings)
        {
            _optionsBuilder = optionsBuilder;
            _engineSettings = engineSettings;
        }

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
