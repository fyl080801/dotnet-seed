using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Seed.Extensions.Plugin
{
    public class PluginRunningContext
    {
        IEnumerable<IPlugin> _plugins;
        IEnumerable<IStartup> _startups;

        public PluginRunningContext(
            IEnumerable<IPlugin> plugins,
            IEnumerable<IStartup> startups)
        {
            _plugins = plugins;
            _startups = startups;
        }

        public IEnumerable<IPlugin> GetPlugins()
        {
            return _plugins;
        }

        public IEnumerable<IStartup> GetStartups()
        {
            return _startups;
        }
    }
}
