using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http.Connections.Internal;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Logging;
using Seed.Modules;
using SeedModules.Acc.Hubs;
using System;

namespace SeedModules.Acc
{
    public class Startup : StartupBase
    {
        public override void ConfigureServices(IServiceCollection services)
        {
            services.AddSignalR();
        }

        public override void Configure(IApplicationBuilder app, IRouteBuilder routes, IServiceProvider serviceProvider)
        {
            var dispatcher = app.ApplicationServices.GetService<HttpConnectionManager>();
            app.UseSignalR(configs =>
            {
                configs.MapHub<DistributeHub>("/signalr");
            });
        }
    }
}
