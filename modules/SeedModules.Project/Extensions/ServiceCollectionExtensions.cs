using Microsoft.Extensions.DependencyInjection;
using SeedModules.Project.Services;

namespace SeedModules.Project.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddProjectExecutionStep<THandler>(this IServiceCollection serviceCollection)
            where THandler : class, IProjectStepHandler
        {
            serviceCollection.AddScoped<IProjectStepHandler, THandler>();

            return serviceCollection;
        }

        public static IServiceCollection AddProject(this IServiceCollection services)
        {
            services.AddScoped<IProjectHarvester, ApplicationProjectHarvester>();
            services.AddScoped<IProjectHarvester, ProjectHarvester>();
            services.AddScoped<IProjectExecutor, ProjectExecutor>();

            return services;
        }
    }
}