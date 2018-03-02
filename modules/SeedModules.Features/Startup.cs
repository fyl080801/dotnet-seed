using Microsoft.Extensions.DependencyInjection;
using Seed.Modules;
using Seed.Plugins.Feature;
using SeedModules.Features.Internal;

namespace SeedModules.Saas
{
    public class Startup : StartupBase
    {
        public override void ConfigureServices(IServiceCollection services)
        {
            services.AddScoped<IFeatureEventHandler, FeatureUpdater>();
        }
    }
}