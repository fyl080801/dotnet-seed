using System;
using System.Collections.Generic;
using System.Text;

namespace Seed.Plugins.Abstractions.Loader
{
    public interface IPluginLoader
    {
        int Order { get; }

        PluginEntry Load(IPluginInfo pluginInfo);
    }
}
