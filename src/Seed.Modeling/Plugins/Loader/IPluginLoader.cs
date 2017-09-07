using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Seed.Plugins.Loader
{
    public interface IPluginLoader
    {
        int Order { get; }

        PluginEntry Load(IPluginInfo pluginInfo);
    }
}