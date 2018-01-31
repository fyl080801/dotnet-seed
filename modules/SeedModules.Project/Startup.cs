using Microsoft.Extensions.DependencyInjection;
using Seed.Modules;
using Seed.Project.Abstractions;
using Seed.Project.Extensions;
using SeedModules.Project.Services;

namespace SeedModules.Project
{
    public class Startup : StartupBase
    {
        public override void ConfigureServices(IServiceCollection services)
        {
            services.AddProject();
            services.AddScoped<IProjectStore, ProjectStore>();
        }
    }
}
