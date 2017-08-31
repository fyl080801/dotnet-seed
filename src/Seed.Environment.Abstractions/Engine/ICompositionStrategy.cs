using Seed.Environment.Abstractions.Engine.Descriptors;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Seed.Environment.Abstractions.Engine
{
    public interface ICompositionStrategy
    {
        Task<EngineSchema> ComposeAsync(EngineSettings settings, EngineDescriptor descriptor);
    }
}
