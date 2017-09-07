using System;
using System.Collections.Generic;
using System.Text;

namespace Seed.Environment.Engine
{
    public interface IEngineContainerFactory
    {
        IServiceProvider CreateContainer(EngineSettings settings, EngineSchema schema);
    }
}
