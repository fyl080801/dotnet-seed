using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Seed.Extensions.Plugin
{
    public interface IPluginManager
    {
        IEnumerable<PluginDescriptor> GetPluginDescriptors();

        void Install(string pluginId);

        void Uninstall(string pluginId);

        void UninstallAll();
    }
}
