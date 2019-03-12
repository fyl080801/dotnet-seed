using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.DependencyInjection;
using React.AspNet;
using Seed.Modules;
using SeedModules.Setup.Services;
using System;
using JavaScriptEngineSwitcher.ChakraCore;
using JavaScriptEngineSwitcher.Extensions.MsDependencyInjection;

namespace SeedModules.Setup
{
    public class Startup : StartupBase
    {
        public override void ConfigureServices(IServiceCollection services)
        {
            // services.AddViewOptions<SetupViewOptionBuilder>();
            services.AddScoped<ISetupService, SetupService>();

            services.AddReact();

            // Make sure a JS engine is registered, or you will get an error!
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
                // If you want to use server-side rendering of React components,
                // add all the necessary JavaScript files here. This includes
                // your components as well as all of their dependencies.
                // See http://reactjs.net/ for more information. Example:
                config
                    .AddScript("/Sample.jsx");

                // If you use an external build too (for example, Babel, Webpack,
                // Browserify or Gulp), you can improve performance by disabling
                // ReactJS.NET's version of Babel and loading the pre-transpiled
                // scripts. Example:
                config
                    .SetLoadBabel(false)
                    .AddScriptWithoutTransform("/Sample.jsx");
            });
        }
    }
}
