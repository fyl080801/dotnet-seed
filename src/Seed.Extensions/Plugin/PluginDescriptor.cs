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

        public Version Version { get; set; }

        public bool Installed { get; set; }

        public ICollection<string> Tags { get; set; } = new HashSet<string>();

        public ICollection<string> IncludePaths { get; set; } = new HashSet<string>();

        public ICollection<Dependency> Dependencies { get; set; } = new HashSet<Dependency>();

        public ICollection<IPlugin> Instances { get; set; } = new HashSet<IPlugin>();
    }
}
