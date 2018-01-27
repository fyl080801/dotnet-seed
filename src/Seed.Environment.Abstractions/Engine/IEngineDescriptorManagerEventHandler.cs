using Seed.Environment.Engine.Descriptors;
using Seed.Events;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Seed.Environment.Engine
{
    public interface IEngineDescriptorManagerEventHandler : IEventHandler
    {
        Task Changed(EngineDescriptor descriptor, string tenant);
    }
}
