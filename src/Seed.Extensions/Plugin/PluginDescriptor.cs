using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Seed.Extensions.Plugin
{
    public class PluginDescriptor
    {
        public string Id { get; set; }

        public string Name { get; set; }

        public string Author { get; set; }

        public string Description { get; set; }

        public string[] Tags { get; set; } = new string[0];

        public Version Version { get; set; }

        public string[] IncludePaths { get; set; } = new string[0];

        public IEnumerable<Dependency> Dependencies { get; set; } = Enumerable.Empty<Dependency>();

        public IPlugin Instance { get; set; }
    }
}
