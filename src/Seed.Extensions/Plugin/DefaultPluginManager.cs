using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Seed.Extensions.Plugin
{
    public class DefaultPluginManager : IPluginManager
    {
        readonly IPluginFinder _pluginFinder;

        public DefaultPluginManager(IPluginFinder pluginFinder)
        {
            _pluginFinder = pluginFinder;
        }

        public IEnumerable<PluginDescriptor> GetPluginDescriptors()
        {
            return OrderPlugins(_pluginFinder.GetDescriptors());
        }

        public void Install(string pluginId)
        {
            throw new NotImplementedException();
        }

        public void Uninstall(string pluginId)
        {
            throw new NotImplementedException();
        }

        public void UninstallAll()
        {
            throw new NotImplementedException();
        }

        private IEnumerable<PluginDescriptor> OrderPlugins(IEnumerable<PluginDescriptor> plugins)
        {
            throw new NotImplementedException();
        }
    }
}
