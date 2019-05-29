using SeedCore.Recipes.Models;
using System.Threading.Tasks;

namespace SeedCore.Recipes.Services
{
    public interface IRecipeStepHandler
    {
        Task ExecuteAsync(RecipeExecutionContext context);
    }
}