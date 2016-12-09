using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Seed.Environment.Plugin
{
    public interface IDescriptorBuilder
    {
        PluginDescriptor Build();
    }
}
