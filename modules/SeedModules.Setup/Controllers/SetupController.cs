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
        readonly IUIOptionsBuilder _optionsBuilder;

        public SetupController(IUIOptionsBuilder optionsBuilder)
        {
            _optionsBuilder = optionsBuilder;
        }

        //public IActionResult Index()
        //{
        //    return View(new OptionsModel()
        //    {
        //        Options = _optionsBuilder.Build().Result
        //    });
        //}

        public IActionResult Index()
        {
            return View("~/SeedModules.AngularUI/Views/Home/Index.cshtml", new OptionsModel()
            {
                Options = _optionsBuilder.Build().Result
            });
        }
    }
}
