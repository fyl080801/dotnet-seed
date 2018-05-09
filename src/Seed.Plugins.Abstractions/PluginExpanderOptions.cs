using System;
using System.Collections.Generic;
using System.Text;

namespace Seed.Plugins
{
    public class PluginExpanderOptions
    {
        public IList<PluginExpanderOption> Options { get; } = new List<PluginExpanderOption>();
    }
}
