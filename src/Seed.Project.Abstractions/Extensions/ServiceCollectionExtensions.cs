using Microsoft.Extensions.DependencyInjection;

namespace Seed.Project
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddProjectExecutionStep<THandler>(this IServiceCollection serviceCollection)
            where THandler : class, IProjectStepHandler
        {
            serviceCollection.AddScoped<IProjectStepHandler, THandler>();

            return serviceCollection;
        }
    }
}