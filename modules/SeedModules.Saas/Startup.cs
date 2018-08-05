using Microsoft.Extensions.DependencyInjection;
using Seed.Modules;
using Seed.Security.Permissions;
using SeedModules.AngularUI.Rendering;

namespace SeedModules.Saas
{
    public class Startup : StartupBase
    {
        public override void ConfigureServices(IServiceCollection services)
        {
            services.AddScoped<IRouteReferenceProvider, RouteReferences>();
            services.AddScoped<IPermissionProvider, Permissions>();
        }
    }
}
