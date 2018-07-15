using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.DependencyInjection;
using Seed.Modules;
using SeedModules.Demo.Hubs;
using System;

namespace SeedModules.Demo
{
    public class Startup : StartupBase
    {
        public override void ConfigureServices(IServiceCollection services)
        {
            //services.AddSignalR();
        }

        public override void Configure(IApplicationBuilder app, IRouteBuilder routes, IServiceProvider serviceProvider)
        {
            //app.UseSignalR(config =>
            //{
            //    config.MapHub<DemoHub>("/demo");
            //});
        }
    }
}
