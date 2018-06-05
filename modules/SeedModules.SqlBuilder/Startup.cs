using Microsoft.Extensions.DependencyInjection;
using Seed.Data;
using Seed.Modules;
using Seed.Security.Permissions;
using SeedModules.AngularUI.Rendering;
using System;

namespace SeedModules.SqlBuilder
{
    public class Startup : StartupBase
    {
        public override void ConfigureServices(IServiceCollection services)
        {
            services.AddScoped<IRouteReferenceProvider, RouteReferences>();
            services.AddScoped<IPermissionProvider, Permissions>();
            services.AddScoped<IEntityTypeConfigurationProvider, EntityTypeConfigurations>();
        }
    }
}
