using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Seed.Extensions.Plugin
{
    public interface IPluginManager
    {
        IEnumerable<PluginDescriptor> GetDescriptors();

        void MakeInstall(string pluginId);

        void MakeUninstall(string pluginId);

        void UninstallAll();
    }
}
