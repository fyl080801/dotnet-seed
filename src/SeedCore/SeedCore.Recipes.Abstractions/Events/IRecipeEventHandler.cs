using System.Threading.Tasks;
using SeedCore.Recipes.Models;

namespace SeedCore.Recipes.Events
{
    public interface IRecipeEventHandler
    {
        Task RecipeExecutingAsync(string executionId, RecipeDescriptor descriptor);
        Task RecipeStepExecutingAsync(RecipeExecutionContext context);
        Task RecipeStepExecutedAsync(RecipeExecutionContext context);
        Task RecipeExecutedAsync(string executionId, RecipeDescriptor descriptor);
        Task ExecutionFailedAsync(string executionId, RecipeDescriptor descriptor);
    }
}