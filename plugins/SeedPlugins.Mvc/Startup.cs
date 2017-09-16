using Seed.Modules;
using System;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Routing;
using Seed.Mvc.Extensions;
using Seed.Modules.Extensions;

namespace SeedPlugins.Mvc
{
    public class Startup : StartupBase
    {
        readonly IServiceProvider _applicationServices;

        public Startup(IServiceProvider applicationServices)
        {
            _applicationServices = applicationServices;
        }

        public override void ConfigureServices(IServiceCollection services)
        {
            services.AddMvcModules(_applicationServices);
        }

        public override void Configure(IApplicationBuilder app, IRouteBuilder routes, IServiceProvider serviceProvider)
        {
            app.ConfigureModules(e =>
            {
                e.UseStaticFilesModules();
            });
        }
    }
}
