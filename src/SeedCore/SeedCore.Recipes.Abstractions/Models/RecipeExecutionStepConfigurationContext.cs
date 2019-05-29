using Newtonsoft.Json.Linq;

namespace SeedCore.Recipes.Models
{
    public class RecipeExecutionStepConfigurationContext : ConfigurationContext
    {
        public RecipeExecutionStepConfigurationContext(JObject configurationElement) : base(configurationElement)
        {
        }
    }
}