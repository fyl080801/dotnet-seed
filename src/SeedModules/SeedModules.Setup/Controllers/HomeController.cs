using Microsoft.AspNetCore.Mvc;
using SeedCore.Shell;
using System;
using System.Collections.Generic;
using System.Text;

namespace SeedModules.Setup.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return Content("aaa");
        }
    }
}
