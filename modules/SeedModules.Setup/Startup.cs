using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Routing;
using Seed.Modules;
using System;

namespace SeedModules.Setup
{
    public class Startup : StartupBase
    {
        public override void Configure(IApplicationBuilder app, IRouteBuilder routes, IServiceProvider serviceProvider)
        {
            base.Configure(app, routes, serviceProvider);
        }
    }
}
