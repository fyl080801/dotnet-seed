using Seed.Environment.Plugin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Seed.Environment.Engine
{
    public class AllPluginsDescriptorManager : IEngineDescriptorManager
    {
        readonly IPluginManager _pluginManager;
        EngineDescriptor _engineDescriptor;

        public AllPluginsDescriptorManager(IPluginManager pluginManager)
        {
            _pluginManager = pluginManager;
        }

        public EngineDescriptor GetEngineDescriptor()
        {
            if (_engineDescriptor == null)
            {
                _engineDescriptor = new EngineDescriptor()
                {
                    Plugins = _pluginManager.GetPluginDescriptors()
                        .Select(e => new EnginePlugin(e.Id) { PluginTypes = e.Context.Types }).ToList()
                };
            }
            return _engineDescriptor;
        }

        public void UpdateEngineDescriptor(string serialCode, IEnumerable<EnginePlugin> enabledPlugins)
        {

        }
    }
}
