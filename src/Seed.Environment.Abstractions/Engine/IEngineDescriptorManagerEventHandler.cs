using Seed.Environment.Abstractions.Engine.Descriptors;
using Seed.Events.Abstractions;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Seed.Environment.Abstractions.Engine
{
    public interface IEngineDescriptorManagerEventHandler : IEventHandler
    {
        Task Changed(EngineDescriptor descriptor, string launcher);
    }
}
