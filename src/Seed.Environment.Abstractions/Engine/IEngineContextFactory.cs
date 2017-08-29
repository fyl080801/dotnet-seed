using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Seed.Environment.Abstractions.Engine
{
    public interface IEngineContextFactory
    {
        Task<EngineContext> CreateContextAsync(EngineSettings settings);

        Task<EngineContext> CreateSetupContextAsync(EngineSettings settings);

        Task<EngineContext> CreateDescribedContextAsync(EngineSettings settings, EngineDescriptor descriptor);
    }
}
