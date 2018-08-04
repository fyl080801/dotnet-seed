using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.DependencyInjection;
using Seed.Modules;
using SeedModules.AngularUI.Extensions;
using SeedModules.AngularUI.Rendering;
using SeedModules.AngularUI.Routes;
using System;

namespace SeedModules.AngularUI
{
    public class Startup : StartupBase
    {
        public override void ConfigureServices(IServiceCollection services)
        {
            services.AddViewOptions<PluginViewOptionBuilder>();
        }

        public override void Configure(IApplicationBuilder app, IRouteBuilder routes, IServiceProvider serviceProvider)
        {
            routes.Routes.Add(new HomeRoute(routes, serviceProvider.GetService<IInlineConstraintResolver>()));
            //routes.MapAreaRoute(
            //    name: "AngularUI",
            //    areaName: "SeedModules.AngularUI",
            //    template: "",
            //    defaults: new { controller = "Home", action = "Index" }
            //);
        }
    }
}
