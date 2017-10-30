using Microsoft.AspNetCore.Mvc;
using Seed.Environment.Engine;
using SeedModules.Setup.Services;
using SeedModules.Setup.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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
        public async Task DoSetup([FromBody]SetupModel model)
        {
            var setupContext = new SetupContext
            {
                Name = model.Name,
                EnabledFeatures = null,// 回头加上默认的
                AdminUsername = model.UserName,
                AdminEmail = model.Email,
                AdminPassword = model.Password,
                Errors = new Dictionary<string, string>()
            };

            await _setupService.SetupAsync(setupContext);

            if (setupContext.Errors.Any())
            {
                foreach (var error in setupContext.Errors)
                {
                    //ModelState.AddModelError(error.Key, error.Value);
                }
                throw new Exception();
            }
        }
    }
}
