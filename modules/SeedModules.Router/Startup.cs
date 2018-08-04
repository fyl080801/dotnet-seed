using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.DependencyInjection;
using Seed.Modules;
using SeedModules.Router.Routes;
using System;

namespace SeedModules.Router
{
    public class Startup : StartupBase
    {
        public override void ConfigureServices(IServiceCollection services)
        {

        }

        public override void Configure(IApplicationBuilder app, IRouteBuilder routes, IServiceProvider serviceProvider)
        {
            routes.Routes.Add(new HomeRoute(routes, serviceProvider.GetService<IInlineConstraintResolver>()));
        }
    }
}
