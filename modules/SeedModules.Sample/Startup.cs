using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Routing;
using Seed.Modules;
using System;
using System.Collections.Generic;
using System.Text;

namespace SeedModules.Sample
{
    public class Startup : StartupBase
    {
        public override void Configure(IApplicationBuilder app, IRouteBuilder routes, IServiceProvider serviceProvider)
        {
            routes.MapAreaRoute(name: "Home", areaName: "SeedModules.Sample", template: "", defaults: new { controller = "Home", action = "Index" });
        }
    }
}
