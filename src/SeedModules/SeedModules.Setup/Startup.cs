using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Routing;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.Extensions.DependencyInjection;
using SeedCore.Modules;
using System;
using System.IO;
using System.Reflection;

namespace SeedModules.Setup
{
    public class Startup : StartupBase
    {
        public override void ConfigureServices(IServiceCollection services)
        {
            services.AddSetup();
        }

        public override void Configure(IApplicationBuilder app, IRouteBuilder routes, IServiceProvider serviceProvider)
        {
            routes.MapAreaRoute(
                name: "Setup",
                areaName: "SeedModules.Setup",
                template: "",
                defaults: new { controller = "Home", action = "Index" }
            );

            app.UseSpa(spa =>
            {
                if (serviceProvider.GetService<IHostingEnvironment>().IsDevelopment())
                {
                    // react开发服务只能从相对路径加载
                    spa.Options.SourcePath = "../SeedModules/SeedModules.Setup/wwwroot/ClientApp";
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
    }
}
