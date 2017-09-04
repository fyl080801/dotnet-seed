using System;
using System.Collections.Generic;
using System.Text;

namespace Seed.Plugins.Abstractions
{
    public interface IPluginProvider
    {
        int Order { get; }

        IPluginInfo GetPluginInfo(IDescriptorInfo descriptorInfo, string path);
    }
}
