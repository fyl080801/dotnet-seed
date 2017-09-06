using System;
using System.Collections.Generic;
using System.Reflection;
using System.Text;

namespace Seed.Plugins.Abstractions.Loader
{
    public class PluginEntry
    {
        public IPluginInfo PluginInfo { get; set; }

        public Assembly Assembly { get; set; }

        public IEnumerable<Type> Exports { get; set; }

        public bool HasError { get; set; }
    }
}
