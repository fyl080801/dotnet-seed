using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.DependencyInjection;
using Seed.Environment.Plugin.Modules;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Seed.Plugin.Demo
{
    public class Startup : StartupBase
    {
        public override void Configure(IApplicationBuilder builder, IRouteBuilder routes, IServiceProvider serviceProvider)
        {
            routes.MapAreaRoute
            (
                name: "Home",
                areaName: "Demo",
                template: "",
                defaults: new { controller = "Home", action = "Index" }
            );
        }

        public override void ConfigureServices(IServiceCollection services)
        {
            
        }
    }
}
