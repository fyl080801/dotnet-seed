using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Routing;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.DependencyInjection;
using Seed.Modules;
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
            services.AddSpaStaticFiles(config =>
            {
                config.RootPath = "../../modules/SeedModules.Setup/ClientApp/build";
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

            var env = serviceProvider.GetService<IHostingEnvironment>();
            app.UseSpaStaticFiles();
            app.UseSpa(config =>
            {
                // config.Options.DefaultPageStaticFileOptions = new StaticFileOptions()
                // {
                //     RequestPath = "/SeedModules.Setup"
                // };
                config.Options.SourcePath = "../../modules/SeedModules.Setup/ClientApp";
                if (env.IsDevelopment())
                {
                    config.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
    }
}
