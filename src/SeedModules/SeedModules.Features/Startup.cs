using Microsoft.Extensions.DependencyInjection;
using SeedCore.MemberShip.Security.Permissions;
using SeedCore.Modules;
using SeedModules.Features.Recipes.Executors;

namespace SeedModules.Features
{
    public class Startup : StartupBase
    {
        public override void ConfigureServices(IServiceCollection services)
        {
            services.AddRecipeExecutionStep<FeatureStep>();
            services.AddScoped<IPermissionProvider, Permissions>();
        }
    }
}
