﻿using Microsoft.Extensions.DependencyInjection;
using Seed.Data.Extensions;
using Seed.Environment.Cache.Extensions;
using Seed.Environment.Engine.Data;
using Seed.Modules;
using Seed.Modules.Extensions;
using Seed.Plugins.Extensions;
using Seed.Project;
using SeedModules.Common.Projects;

namespace SeedModules.Common
{
    public class Startup : StartupBase
    {
        public override void ConfigureServices(IServiceCollection services)
        {
            services.AddDeferredTasks();
            services.AddDataAccess();
            services.AddPluginManager();
            services.AddEngineDescriptorStorage();

            services.AddCaching();

            services.AddProjectExecutionStep<FeatureStep>();
        }
    }
}
