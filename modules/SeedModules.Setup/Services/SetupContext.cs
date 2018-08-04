using Seed.Project.Models;
using System.Collections.Generic;

namespace SeedModules.Setup.Services
{
    public class SetupContext
    {
        public string Name { get; set; }

        public string AdminUsername { get; set; }

        public string AdminEmail { get; set; }

        public string AdminPassword { get; set; }

        public string DatabaseProvider { get; set; }

        public string DatabaseConnectionString { get; set; }

        public string DatabaseTablePrefix { get; set; }

        public ProjectDescriptor Project { get; set; }

        public IEnumerable<string> EnabledFeatures { get; set; }

        public IDictionary<string, string> Errors { get; set; } = new Dictionary<string, string>();
    }
}
