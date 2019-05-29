using Newtonsoft.Json.Linq;

namespace SeedCore.Recipes.Models
{
    public class ConfigurationContext
    {
        protected ConfigurationContext(JObject configurationElement)
        {
            ConfigurationElement = configurationElement;
        }

        public JObject ConfigurationElement { get; set; }
    }
}