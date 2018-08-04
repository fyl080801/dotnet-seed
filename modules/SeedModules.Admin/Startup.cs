using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.DependencyInjection;
using Seed.Modules;
using Seed.Modules.Setup.Events;
using Seed.Mvc.Settings;
using Seed.Project.Extensions;
using SeedModules.Admin.Projects;
using SeedModules.Admin.Rendering;
using SeedModules.Admin.Services;
using SeedModules.AngularUI.Rendering;
using System;

namespace SeedModules.Admin
{
    public class Startup : StartupBase
    {
        public override void ConfigureServices(IServiceCollection services)
        {
            services.AddScoped<ISetupEventHandler, SetupEventHandler>();
            services.AddSingleton<ISiteService, SiteService>();
            services.AddProjectExecutionStep<SettingsStep>();

            services.AddScoped<ISiteSettingsBuilder, SiteSettingsBuilder>();
            //services.AddScoped<IRouteReferenceProvider, RouteReferences>();
        }

        public override void Configure(IApplicationBuilder app, IRouteBuilder routes, IServiceProvider serviceProvider)
        {

        }
    }
}
