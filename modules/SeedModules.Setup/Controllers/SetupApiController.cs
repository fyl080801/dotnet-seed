using Microsoft.AspNetCore.Mvc;
using Seed.Environment.Engine;
using SeedModules.Setup.Services;
using SeedModules.Setup.ViewModels;
using System;
using System.Collections.Generic;
using System.Text;

namespace SeedModules.Setup.Controllers
{
    [Route("api/setup")]
    public class SetupApiController : Controller
    {
        ISetupService _setupService;
        EngineSettings _engineSettings;

        public SetupApiController(ISetupService setupService, EngineSettings engineSettings)
        {
            _setupService = setupService;
            _engineSettings = engineSettings;
        }

        [HttpPost]
        public bool DoSetup([FromBody]SetupModel model)
        {
            return true;
        }
    }
}
