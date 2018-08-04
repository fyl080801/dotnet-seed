using Microsoft.Extensions.DependencyInjection;
using Seed.Modules;
using Seed.Modules.Setup.Events;
using Seed.Mvc.Settings;
using SeedModules.Admin.Projects;
using SeedModules.Admin.Services;
using SeedModules.Project.Extensions;

namespace SeedModules.Admin
{
    public class Startup : StartupBase
    {
        public override void ConfigureServices(IServiceCollection services)
        {
            services.AddScoped<ISetupEventHandler, SetupEventHandler>();
            services.AddSingleton<ISiteService, SiteService>();
            services.AddProjectExecutionStep<SettingsStep>();
        }
    }
}
