using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Text;

namespace SeedModules.Setup.Controllers
{
    public class SetupController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
