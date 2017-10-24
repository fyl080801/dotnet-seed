using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Routing;
using Seed.Modules;
using System;

namespace SeedModules.Settings
{
    public class Startup : StartupBase
    {
        public override void Configure(IApplicationBuilder app, IRouteBuilder routes, IServiceProvider serviceProvider)
        {
            routes.MapAreaRoute(
                name: "AdminSettings",
                areaName: "SeedModules.Settings",
                template: "Admin/Settings/{groupId}",
                defaults: new { controller = "Admin", action = "Index" }
            );
        }
    }
}
