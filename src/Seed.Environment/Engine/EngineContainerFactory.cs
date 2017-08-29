using Seed.Environment.Abstractions.Engine;
using System;
using System.Collections.Generic;
using System.Text;

namespace Seed.Environment.Engine
{
    public class EngineContainerFactory : IEngineContainerFactory
    {
        public IServiceProvider CreateContainer(EngineSettings settings, EngineSchema schema)
        {
            throw new NotImplementedException();
        }
    }
}
