using System;
using Microsoft.Extensions.DependencyInjection;
using Seed.Data;
using Seed.Modules;
using SeedModules.AngularUI.Rendering;

namespace SeedModules.MindPlus
{
    public class Startup : StartupBase
    {
        public override void ConfigureServices(IServiceCollection services)
        {
            services.AddScoped<IRouteReferenceProvider, RouteReferences>();
            services.AddScoped<IEntityTypeConfigurationProvider, EntityTypeConfigurations>();
        }
    }
}
