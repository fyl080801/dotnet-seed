using Seed.Plugins.Descriptors;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Seed.Plugins
{
    public interface IPluginProvider
    {
        int Order { get; }

        IPluginInfo GetPluginInfo(IDescriptorInfo descriptorInfo, string path);
    }
}