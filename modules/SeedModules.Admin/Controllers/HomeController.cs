using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Seed.Mvc.Filters;
using SeedModules.AngularUI.Extensions;

namespace SeedModules.Admin.Controllers
{
    public class HomeController : Controller
    {
        [GenerateAntiforgeryTokenCookie]
        public IActionResult Login(string returnUrl = null)
        {
            return this.UI();
        }
    }
}
