using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Text;

namespace SeedModules.Acc.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View("~/SeedModules.Acc/Views/Home/Index.cshtml");
        }
    }
}
