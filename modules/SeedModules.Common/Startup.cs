using Microsoft.Extensions.DependencyInjection;
using Seed.Data.Extensions;
using Seed.Environment.Caching.Extensions;
using Seed.Environment.Engine.Data;
using Seed.Modules;
using Seed.Modules.Extensions;
using SeedModules.Common.Projects;
using SeedModules.Project.Extensions;

namespace SeedModules.Common
{
    public class Startup : StartupBase
    {
        public override void ConfigureServices(IServiceCollection services)
        {
            //services.AddDeferredTasks();
            //services.AddDataAccess();
            //services.AddPluginManager();
            //services.AddEngineDescriptorStorage();

            //services.AddCaching();

            services.AddProjectExecutionStep<FeatureStep>();
        }
    }
}
