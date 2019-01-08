using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Text;
using SeedModules.AngularUI.Extensions;
using SeedModules.AngularUI.Filters;
using SeedModules.AngularUI.Models;
using SeedModules.AngularUI.Rendering;
using Microsoft.AspNetCore.Authorization;

namespace SeedModules.OpenId.Controllers
{
    public class OAuth2Controller : Controller
    {
        [Authorize]
        [RouteRequires("rcss!SeedModules.AngularUI/css/bootstrap-theme.min.css", "SeedModules.OpenId/modules/oauth2/module")]
        public IActionResult Authorize()
        {
            return this.UI();
        }
    }
}
