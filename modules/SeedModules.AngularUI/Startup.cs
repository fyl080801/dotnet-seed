using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.DependencyInjection;
using Seed.Modules;
using System;

namespace SeedModules.AngularUI
{
    public class Startup : StartupBase
    {
        public override void ConfigureServices(IServiceCollection services)
        {

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
