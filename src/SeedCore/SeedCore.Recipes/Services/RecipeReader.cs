using Microsoft.Extensions.FileProviders;
using Newtonsoft.Json;
using SeedCore.Recipes.Models;
using System.IO;
using System.Threading.Tasks;

namespace SeedCore.Recipes.Services
{
    public class RecipeReader : IRecipeReader
    {
        public Task<RecipeDescriptor> GetRecipeDescriptor(string recipeBasePath, IFileInfo recipeFileInfo, IFileProvider recipeFileProvider)
        {
            using (var stream = recipeFileInfo.CreateReadStream())
            {
                using (var reader = new StreamReader(stream))
                {
                    using (var jsonReader = new JsonTextReader(reader))
                    {
                        var serializer = new JsonSerializer();
                        var recipeDescriptor = serializer.Deserialize<RecipeDescriptor>(jsonReader);

                        recipeDescriptor.FileProvider = recipeFileProvider;
                        recipeDescriptor.BasePath = recipeBasePath;
                        recipeDescriptor.RecipeFileInfo = recipeFileInfo;

                        return Task.FromResult(recipeDescriptor);
                    }
                }
            }
        }
    }
}
