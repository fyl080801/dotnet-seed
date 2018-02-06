using Microsoft.AspNetCore.Mvc;
using SeedModules.AngularUI.Models;
using SeedModules.AngularUI.Rendering;
using System;
using System.Collections.Generic;
using System.Text;

namespace SeedModules.Admin.Controllers
{
    public class HomeController : Controller
    {
        readonly IViewOptionsBuilder _optionsBuilder;

        public HomeController(IViewOptionsBuilder optionsBuilder)
        {
            _optionsBuilder = optionsBuilder;
        }

        public IActionResult Index()
        {
            return View("~/SeedModules.AngularUI/Views/Home/Index.cshtml", new OptionsModel()
            {
                Options = _optionsBuilder.Build().Result
            });
        }
    }
}
