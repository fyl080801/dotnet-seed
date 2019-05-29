using SeedCore.Recipes.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SeedCore.Recipes.Services
{
    public interface IRecipeHarvester
    {
        Task<IEnumerable<RecipeDescriptor>> HarvestRecipesAsync();

    }
}