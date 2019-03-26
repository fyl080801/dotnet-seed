using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Routing;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.DependencyInjection;
using Seed.Modules;
using Seed.Modules.Extensions;
using SeedModules.Setup.Services;
using System;

namespace SeedModules.Setup
{
    public class Startup : Seed.Modules.StartupBase
    {
        public override void ConfigureServices(IServiceCollection services)
        {
            // services.AddViewOptions<SetupViewOptionBuilder>();
            services.AddScoped<ISetupService, SetupService>();
            services.AddSeedSpaStaticFiles(config =>
            {
                config.RootPath = "build";
            });
        }

        public override void Configure(IApplicationBuilder app, IRouteBuilder routes, IServiceProvider serviceProvider)
        {
            routes.MapAreaRoute(
                name: "Setup",
                areaName: "SeedModules.Setup",
                template: "",
                defaults: new { controller = "Home", action = "Index" }
            );

            app.UseSeedSpa(new SeedSpaOptions()
            {
                SpaType = "react"
            });

        }
    }
}
