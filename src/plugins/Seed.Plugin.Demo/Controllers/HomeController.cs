using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Razor;

namespace Seed.Plugin.Demo.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View((object)"ssssss");
        }
    }
}
