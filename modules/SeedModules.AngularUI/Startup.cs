using Seed.Modules;
using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Routing;
using SeedModules.AngularUI.Rendering;
using SeedModules.AngularUI.Extensions;
using SeedModules.Project.Services;
using SeedModules.AngularUI.Projects;
using SeedModules.Project.Extensions;

namespace SeedModules.AngularUI
{
    public class Startup : StartupBase
    {
        public override void ConfigureServices(IServiceCollection services)
        {
            services.AddProjectExecutionStep<RouteSettingStep>();
        }

        public override void Configure(IApplicationBuilder app, IRouteBuilder routes, IServiceProvider serviceProvider)
        {
            //routes.MapAreaRoute(
            //    name: "AngularUI",
            //    areaName: "SeedModules.AngularUI",
            //    template: "",
            //    defaults: new { controller = "Home", action = "Index" }
            //);
        }
    }
}
