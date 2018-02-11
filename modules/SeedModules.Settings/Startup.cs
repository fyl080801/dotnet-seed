using Microsoft.Extensions.DependencyInjection;
using Seed.Modules;
using Seed.Modules.Setup.Events;
using Seed.Modules.Site;
using Seed.Security.Permissions;
using SeedModules.Project.Extensions;
using SeedModules.Settings.Projects;
using SeedModules.Settings.Services;

namespace SeedModules.Settings
{
    public class Startup : StartupBase
    {
        public override void ConfigureServices(IServiceCollection services)
        {
            services.AddScoped<ISetupEventHandler, SetupEventHandler>();
            services.AddScoped<IPermissionProvider, PermissionProvider>();
            services.AddSingleton<ISiteService, SiteService>();

            services.AddProjectExecutionStep<SettingsStep>();
        }
    }
}
