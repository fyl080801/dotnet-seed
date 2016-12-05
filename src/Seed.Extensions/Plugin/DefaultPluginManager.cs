using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Seed.Extensions.Plugin
{
    public class DefaultPluginManager : IPluginManager
    {
        public IEnumerable<PluginDescriptor> Plugins { get; }

        public DefaultPluginManager(IPluginFinder pluginFinder)
        {
            Plugins = pluginFinder.GetDescriptors();
        }

        public IEnumerable<PluginDescriptor> GetPluginDescriptors()
        {
            return OrderPlugins(Plugins);
        }

        public void Install(string pluginId)
        {
            Plugins.FirstOrDefault(e => e.Id == pluginId)?.Context.GetPlugins().ToList().ForEach(part => part.Install());
        }

        public void Uninstall(string pluginId)
        {
            Plugins.FirstOrDefault(e => e.Id == pluginId)?.Context.GetPlugins().ToList().ForEach(part => part.Uninstall());
        }

        public void UninstallAll()
        {
            Plugins.ToList().ForEach(plugin => plugin.Context.GetPlugins().ToList().ForEach(part => part.Uninstall()));
        }

        private IEnumerable<PluginDescriptor> OrderPlugins(IEnumerable<PluginDescriptor> plugins)
        {
            throw new NotImplementedException("根据依赖排序 plugin 方法暂未实现");
        }
    }
}
