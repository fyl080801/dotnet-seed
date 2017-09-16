using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Text;

namespace SeedPlugins.Sample.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return Content("aaaaaaaaa");
        }
    }
}
