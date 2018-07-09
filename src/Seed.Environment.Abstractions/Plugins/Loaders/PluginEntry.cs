using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace Seed.Environment.Plugins.Loaders
{
    public class PluginEntry
    {
        public IPluginInfo PluginInfo { get; set; }

        public Assembly Assembly { get; set; }

        public IEnumerable<Type> ExportedTypes { get; set; }

        public bool IsError { get; set; }
    }
}