using System;
using JavaScriptEngineSwitcher.ChakraCore;
using JavaScriptEngineSwitcher.Extensions.MsDependencyInjection;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.DependencyInjection;
using React.AspNet;
using Seed.Modules;
using Seed.Modules.Extensions;
using SeedModules.Setup.Services;

namespace SeedModules.Setup
{
    public class Startup : StartupBase
    {
        public override void ConfigureServices(IServiceCollection services)
        {
            // services.AddViewOptions<SetupViewOptionBuilder>();
            services.AddScoped<ISetupService, SetupService>();
            services.AddReact();
            services.AddJsEngineSwitcher(options => options.DefaultEngineName = ChakraCoreJsEngine.EngineName)
                .AddChakraCore();
        }

        public override void Configure(IApplicationBuilder app, IRouteBuilder routes, IServiceProvider serviceProvider)
        {
            routes.MapAreaRoute(
                name: "Setup",
                areaName: "SeedModules.Setup",
                template: "",
                defaults: new { controller = "Home", action = "Index" }
            );

            app.UseReact(config =>
            {
                config
                    .SetReuseJavaScriptEngines(false)
                    .SetLoadBabel(false)
                    .SetLoadReact(true)
                    .AddScript("SeedModules.Setup/Root.jsx");
                // .AddScriptWithoutTransform("~/dist/runtime.js")
                // .AddScriptWithoutTransform("~/dist/vendor.js")
                // .AddScriptWithoutTransform("~/dist/components.js");
            });
        }
    }
}
