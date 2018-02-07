using Microsoft.AspNetCore.Mvc;
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

        public SetupController(IViewOptionsBuilder optionsBuilder)
        {
            _optionsBuilder = optionsBuilder;
        }

        public IActionResult Index()
        {
            return View("~/SeedModules.AngularUI/Views/Home/Index.cshtml", new ViewOptionsModel()
            {
                Options = _optionsBuilder.Build(RouteData).Result
            });
        }
    }
}
