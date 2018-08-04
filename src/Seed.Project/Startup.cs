using Microsoft.Extensions.DependencyInjection;
using Seed.Modules;
using Seed.Project.Extensions;
using Seed.Project.Steps;

namespace Seed.Project
{
    public class Startup : StartupBase
    {
        public override void ConfigureServices(IServiceCollection services)
        {
            services.AddProject();
            services.AddScoped<IProjectStore, ProjectStore>();

            services.AddProjectExecutionStep<ProjectStep>();
            services.AddProjectExecutionStep<FeatureStep>();

            //services.AddScoped<IEntityTypeConfigurationProvider, EntityTypeConfigurations>();
        }
    }
}
