using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace SeedCore.Setup
{
    public interface ISetupService
    {
        // Task<IEnumerable<RecipeDescriptor>> GetSetupRecipesAsync();
        Task<string> SetupAsync(SetupContext context);
    }
}
