using Microsoft.Extensions.DependencyInjection;
using Seed.Data.Extensions;
using Seed.Environment.Cache.Extensions;
using Seed.Modules;
using Seed.Modules.Extensions;
using Seed.Plugins.Extensions;

namespace SeedModules.Common
{
    public class Startup : StartupBase
    {
        public override void ConfigureServices(IServiceCollection services)
        {
            services.AddDeferredTasks();
            services.AddDataAccess();
            services.AddPluginManager();

            services.AddCaching();
        }
    }
}
