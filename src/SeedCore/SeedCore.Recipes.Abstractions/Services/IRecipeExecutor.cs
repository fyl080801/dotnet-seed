using SeedCore.Recipes.Models;
using System.Threading;
using System.Threading.Tasks;

namespace SeedCore.Recipes.Services
{
    public interface IRecipeExecutor
    {
        Task<string> ExecuteAsync(string executionId, RecipeDescriptor recipeDescriptor, object environment, CancellationToken cancellationToken);
    }
}