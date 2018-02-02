using Seed.Modules;
using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Routing;

namespace SeedModules.AngularUI
{
    public class Startup : StartupBase
    {
        public override void Configure(IApplicationBuilder app, IRouteBuilder routes, IServiceProvider serviceProvider)
        {
            routes.MapAreaRoute(
                name: "AngularUI",
                areaName: "SeedModules.AngularUI",
                template: "",
                defaults: new { controller = "Home", action = "Index" }
            );
        }
    }
}
