using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;

namespace Seed.Plugins.Loader
{
    /// <summary>
    /// Plugin 入口信息
    /// </summary>
    public class PluginEntry
    {
        public IPluginInfo PluginInfo { get; set; } = null;

        public Assembly Assembly { get; set; }

        public IEnumerable<Type> Exports { get; set; } = new HashSet<Type>();

        public bool HasError { get; set; }
    }
}