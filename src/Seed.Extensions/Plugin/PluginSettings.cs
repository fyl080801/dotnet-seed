using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Seed.Extensions.Plugin
{
    public class PluginSettings
    {
        public string Path { get; set; }

        public HashSet<string> Installed { get; set; } = new HashSet<string>();
    }
}
