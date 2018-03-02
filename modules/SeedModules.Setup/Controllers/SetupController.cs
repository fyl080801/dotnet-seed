using Microsoft.AspNetCore.Mvc;
using Seed.Environment.Engine;
using SeedModules.Setup.Services;
using SeedModules.Setup.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SeedModules.Project.Services;
using SeedModules.Project.Models;

namespace SeedModules.Setup.Controllers
{
    [Route("api/setup")]
    public class SetupController : Controller
    {
        ISetupService _setupService;
        EngineSettings _engineSettings;
        IProjectReader _projectReader;

        public SetupController(
            ISetupService setupService,
            EngineSettings engineSettings,
            IProjectReader projectReader)
        {
            _setupService = setupService;
            _engineSettings = engineSettings;
            _projectReader = projectReader;
        }

        [HttpPost]
        [Route("project")]
        public async Task<ProjectDescriptor> ChangeProject()
        {
            if (Request.Form.Files.Count <= 0)
                throw new Exception("未选择任何文件");

            return await Task.FromResult(_projectReader.ReadDescriptor(new FormFileInfo(Request.Form.Files[0])));
        }

        [HttpPost]
        public async Task DoSetup([FromForm]SetupModel model)
        {
            if (Request.Form.Files.Count <= 0)
                throw new Exception("未选择任何项目文件");

            var setupContext = new SetupContext
            {
                Name = model.Name,
                EnabledFeatures = null,// 回头加上默认的
                AdminUsername = model.UserName,
                AdminEmail = model.Email,
                AdminPassword = model.Password,
                Errors = new Dictionary<string, string>(),
                DatabaseConnectionString = model.ConnectionString,
                DatabaseProvider = model.DatabaseProvider,
                DatabaseTablePrefix = model.TablePrefix,
                Project = await Task.FromResult(_projectReader.ReadDescriptor(new FormFileInfo(Request.Form.Files[0])))
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
