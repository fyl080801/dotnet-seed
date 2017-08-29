using Seed.Environment.Abstractions.Engine;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Seed.Environment.Engine
{
    public class EngineContextFactory : IEngineContextFactory
    {
        public Task<EngineContext> CreateContextAsync(EngineSettings settings)
        {
            throw new NotImplementedException();
        }

        public Task<EngineContext> CreateDescribedContextAsync(EngineSettings settings, EngineDescriptor descriptor)
        {
            throw new NotImplementedException();
        }

        public Task<EngineContext> CreateSetupContextAsync(EngineSettings settings)
        {
            throw new NotImplementedException();
        }
    }
}
