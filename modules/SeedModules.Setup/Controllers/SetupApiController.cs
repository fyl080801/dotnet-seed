using Microsoft.AspNetCore.Mvc;
using SeedModules.Setup.ViewModels;
using System;
using System.Collections.Generic;
using System.Text;

namespace SeedModules.Setup.Controllers
{
    [Route("api/setup")]
    public class SetupApiController : Controller
    {
        [HttpPost]
        public bool DoSetup(SetupModel model)
        {
            return true;
        }
    }
}
