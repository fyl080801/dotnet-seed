using Microsoft.AspNetCore.Mvc;
using SeedCore.Setup;
using SeedCore.Shell;
using System;
using System.Collections.Generic;
using System.Text;

namespace SeedModules.Setup.Controllers
{
    public class HomeController : Controller
    {
        readonly ISetupService _setupService;

        public HomeController(ISetupService setupService)
        {
            _setupService = setupService;
        }

        public ActionResult Index(string token)
        {
            var x = _setupService.ToString();
            Console.WriteLine(x);
            return Content("aaaa");
        }
    }
}
