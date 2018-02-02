using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.DependencyInjection;
using Seed.Modules;
using SeedModules.Setup.Services;
using System;

namespace SeedModules.Setup
{
    public class Startup : StartupBase
    {
        public override void ConfigureServices(IServiceCollection services)
        {
            services.AddScoped<ISetupService, SetupService>();
        }

        public override void Configure(IApplicationBuilder app, IRouteBuilder routes, IServiceProvider serviceProvider)
        {
            // routes.MapAreaRoute(
            //     name: "Setup",
            //     areaName: "SeedModules.Setup",
            //     template: "",
            //     defaults: new { controller = "Setup", action = "Index" }
            // );
        }
    }
}
