using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.DependencyInjection;
using Seed.Modules;
using Seed.Modules.Extensions;
using Seed.Mvc.Extensions;
using System;

namespace SeedModules.Mvc
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
