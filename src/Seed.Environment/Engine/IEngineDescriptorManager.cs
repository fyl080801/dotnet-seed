using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Seed.Environment.Engine
{
    public interface IEngineDescriptorManager
    {
        EngineDescriptor GetEngineDescriptor();

        void UpdateEngineDescriptor(string serialCode, IEnumerable<EnginePlugin> enabledPlugins);
    }
}
