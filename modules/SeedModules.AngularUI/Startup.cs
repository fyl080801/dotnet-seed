using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.DependencyInjection;
using Seed.Modules;
using SeedModules.AngularUI.Extensions;
using SeedModules.AngularUI.Rendering;
using System;

namespace SeedModules.AngularUI
{
    public class Startup : StartupBase
    {
        public override void ConfigureServices(IServiceCollection services)
        {
            services.AddViewOptions<PluginViewOptionBuilder>();
        }

        public override void Configure(IApplicationBuilder app, IRouteBuilder routes, IServiceProvider serviceProvider)
        {

        }
    }
}
