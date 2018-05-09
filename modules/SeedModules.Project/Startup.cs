using Microsoft.Extensions.DependencyInjection;
using Seed.Data;
using Seed.Modules;
using SeedModules.Project.Extensions;
using SeedModules.Project.Projects;
using SeedModules.Project.Services;

namespace SeedModules.Project
{
    public class Startup : StartupBase
    {
        public override void ConfigureServices(IServiceCollection services)
        {
            services.AddProject();
            services.AddScoped<IProjectStore, ProjectStore>();

            services.AddProjectExecutionStep<ProjectStep>();

            services.AddScoped<IEntityTypeConfigurationProvider, EntityTypeConfigurations>();
        }
    }
}
