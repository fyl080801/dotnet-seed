using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Text;

namespace SeedModules.Settings.Controllers
{
    public class AdminController : Controller
    {
        public IActionResult Index(string groupId)
        {
            return View();
        }
    }
}
