using Microsoft.Extensions.DependencyInjection;
using Seed.Data;
using Seed.Modules;

namespace SeedModules.InPathTest
{
    public class Startup : StartupBase
    {
        public override void ConfigureServices(IServiceCollection services)
        {
            services.AddScoped<IEntityTypeConfigurationProvider, EntityTypeConfigurations>();
        }
    }
}
