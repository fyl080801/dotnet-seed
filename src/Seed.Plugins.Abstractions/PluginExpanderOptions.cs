using System;
using System.Collections.Generic;
using System.Text;

namespace Seed.Plugins.Abstractions
{
    public class PluginExpanderOptions
    {
        public IList<PluginExpanderOption> Options { get; } = new List<PluginExpanderOption>();
    }
}
