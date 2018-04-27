using Microsoft.Extensions.DependencyInjection;
using Seed.Modules;
using Seed.Security.Permissions;

namespace SeedModules.Saas
{
    public class Startup : StartupBase
    {
        public override void ConfigureServices(IServiceCollection services)
        {
            services.AddScoped<IPermissionProvider, Permissions>();
        }
    }
}
