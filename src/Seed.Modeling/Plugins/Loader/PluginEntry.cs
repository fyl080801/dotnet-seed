using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;

namespace Seed.Plugins.Loader
{
    public class PluginEntry
    {
        public IPluginInfo PluginInfo { get; set; }

        public Assembly Assembly { get; set; }

        public IEnumerable<Type> Exports { get; set; }

        public bool HasError { get; set; }
    }
}