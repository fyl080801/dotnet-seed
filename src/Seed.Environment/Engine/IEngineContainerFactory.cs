using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Seed.Environment.Engine
{
    public interface IEngineContainerFactory
    {
        IServiceProvider CreateContainer(EngineEnvironment environment, EngineDescriptor descriptor);
    }
}
