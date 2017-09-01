using Seed.Environment.Abstractions.Engine;
using System;
using System.Collections.Generic;
using System.Text;
using Seed.Environment.Abstractions.Engine.Descriptors;
using System.Threading.Tasks;

namespace Seed.Environment.Engine
{
    public class EngineStateCoordinator : IEngineDescriptorManagerEventHandler
    {
        public Task Changed(EngineDescriptor descriptor, string launcher)
        {
            throw new NotImplementedException();
        }
    }
}
