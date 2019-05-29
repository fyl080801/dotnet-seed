using SeedCore.Recipes.Services;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddRecipes(this IServiceCollection services)
        {
            services.AddScoped<IRecipeHarvester, ApplicationRecipeHarvester>();
            services.AddScoped<IRecipeHarvester, RecipeHarvester>();
            services.AddSingleton<IRecipeExecutor, RecipeExecutor>();
            services.AddScoped<IRecipeMigrator, RecipeMigrator>();
            services.AddScoped<IRecipeReader, RecipeReader>();

            return services;
        }
    }
}
