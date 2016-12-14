using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Seed.Environment.Plugin
{
    public class PluginRunningContext
    {
        public IEnumerable<Type> Types { get; set; } = new HashSet<Type>();

        //IEnumerable<IPlugin> _plugins;

        //public PluginRunningContext(
        //    IEnumerable<IPlugin> plugins)
        //{
        //    _plugins = plugins;
        //}

        //public IEnumerable<IPlugin> GetPlugins()
        //{
        //    return _plugins;
        //}
    }
}
