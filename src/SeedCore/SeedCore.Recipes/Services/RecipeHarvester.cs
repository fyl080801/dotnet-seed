using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Logging;
using SeedCore.Addon;
using SeedCore.Modules;
using SeedCore.Recipes.Models;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace SeedCore.Recipes.Services
{
    public class RecipeHarvester : IRecipeHarvester
    {
        private readonly IRecipeReader _recipeReader;
        private readonly IExtensionManager _extensionManager;
        private readonly IHostingEnvironment _hostingEnvironment;

        public RecipeHarvester(
            IRecipeReader recipeReader,
            IExtensionManager extensionManager,
            IHostingEnvironment hostingEnvironment,
            ILogger<RecipeHarvester> logger)
        {
            _recipeReader = recipeReader;
            _extensionManager = extensionManager;
            _hostingEnvironment = hostingEnvironment;

            Logger = logger;
        }

        public ILogger Logger { get; set; }

        public virtual Task<IEnumerable<RecipeDescriptor>> HarvestRecipesAsync()
        {
            return _extensionManager.GetExtensions().InvokeAsync(HarvestRecipes, Logger);
        }

        private Task<IEnumerable<RecipeDescriptor>> HarvestRecipes(IExtensionInfo extension)
        {
            var folderSubPath = PathExtensions.Combine(extension.SubPath, "Recipes");
            return HarvestRecipesAsync(folderSubPath);
        }

        protected Task<IEnumerable<RecipeDescriptor>> HarvestRecipesAsync(string path)
        {
            var recipeDescriptors = new List<RecipeDescriptor>();

            var recipeFiles = _hostingEnvironment.ContentRootFileProvider.GetDirectoryContents(path)
                .Where(x => !x.IsDirectory && x.Name.EndsWith(".recipe.json"));

            recipeDescriptors.AddRange(recipeFiles.Select(recipeFile => _recipeReader.GetRecipeDescriptor(path, recipeFile, _hostingEnvironment.ContentRootFileProvider).Result));

            return Task.FromResult<IEnumerable<RecipeDescriptor>>(recipeDescriptors);
        }
    }
}