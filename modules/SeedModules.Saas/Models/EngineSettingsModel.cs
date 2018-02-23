using Microsoft.AspNetCore.Mvc.ModelBinding;
using Seed.Environment.Engine;

namespace SeedModules.Saas.Models
{
    public class EngineSettingsModel
    {
        public bool Selected { get; set; }

        public string Name { get; set; }

        public bool IsDefault { get; set; }

        [BindNever]
        public EngineSettings EngineSettings { get; set; }
    }
}