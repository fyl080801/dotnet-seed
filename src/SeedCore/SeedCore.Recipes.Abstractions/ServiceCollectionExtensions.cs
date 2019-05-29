using SeedCore.Recipes.Services;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddRecipeExecutionStep<TImplementation>(
            this IServiceCollection serviceCollection)
            where TImplementation : class, IRecipeStepHandler
        {
            serviceCollection.AddScoped<IRecipeStepHandler, TImplementation>();

            return serviceCollection;
        }
    }
}