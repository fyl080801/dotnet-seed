using Microsoft.Extensions.FileProviders;
using SeedCore.Recipes.Models;
using System.Threading.Tasks;

namespace SeedCore.Recipes.Services
{
    public interface IRecipeReader
    {
        Task<RecipeDescriptor> GetRecipeDescriptor(string recipeBasePath, IFileInfo recipeFileInfo, IFileProvider fileProvider);
    }
}
