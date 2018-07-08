using Microsoft.Extensions.DependencyInjection;
using Seed.Environment.Engine;
using Seed.Modules;
using SeedModules.AngularUI.Rendering;
using SeedModules.Features;
using SeedModules.Features.Internal;

namespace SeedModules.Saas
{
    public class Startup : StartupBase
    {
        public override void ConfigureServices(IServiceCollection services)
        {
            services.AddScoped<IRouteReferenceProvider, RouteReferences>();
            services.AddScoped<IFeatureEventHandler, FeatureUpdater>();
        }
    }
}