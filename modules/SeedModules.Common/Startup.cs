using Microsoft.Extensions.DependencyInjection;
using Seed.Data.Extensions;
using Seed.Modules;
using Seed.Plugins.Extensions;

namespace SeedModules.Common
{
    public class Startup : StartupBase
    {
        public override void ConfigureServices(IServiceCollection services)
        {
            services.AddDataAccess();
            services.AddPluginManager();
        }
    }
}
