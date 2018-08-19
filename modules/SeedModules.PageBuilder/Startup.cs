using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.DependencyInjection;
using Seed.Data;
using Seed.Modules;
using SeedModules.AngularUI.Rendering;
using SeedModules.PageBuilder.Extensions;
using System;

namespace SeedModules.PageBuilder
{
    public class Startup : StartupBase
    {
        public override void ConfigureServices(IServiceCollection services)
        {
            services.AddScoped<IRouteReferenceProvider, RouteReferences>();
            services.AddScoped<IEntityTypeConfigurationProvider, EntityTypeConfigurations>();

            services.AddDynamicBusiness();
        }

        public override void Configure(IApplicationBuilder app, IRouteBuilder routes, IServiceProvider serviceProvider)
        {
            app.UseDynamicBusiness(routes, serviceProvider);
        }
    }
}
