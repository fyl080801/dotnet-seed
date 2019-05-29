using Microsoft.Extensions.DependencyInjection;
using SeedCore.Modules;
using SeedModules.Recipes.RecipeSteps;

namespace SeedModules.Recipes
{
    public class Startup : StartupBase
    {
        public override void ConfigureServices(IServiceCollection services)
        {
            services.AddRecipes();

            services.AddRecipeExecutionStep<RecipesStep>();
        }
    }
}
