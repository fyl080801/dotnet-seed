using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Logging;
using SeedCore.Addon;
using SeedCore.Recipes.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SeedCore.Recipes.Services
{
    public class ApplicationRecipeHarvester : RecipeHarvester
    {
        public ApplicationRecipeHarvester(
            IRecipeReader recipeReader,
            IExtensionManager extensionManager,
            IHostingEnvironment hostingEnvironment,
            ILogger<RecipeHarvester> logger)
            : base(recipeReader, extensionManager, hostingEnvironment, logger)
        {
        }

        public IStringLocalizer T { get; set; }

        public override Task<IEnumerable<RecipeDescriptor>> HarvestRecipesAsync()
        {
            return HarvestRecipesAsync("Recipes");
        }
    }
}