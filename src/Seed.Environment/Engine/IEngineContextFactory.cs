using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Seed.Environment.Engine
{
    public interface IEngineContextFactory
    {
        EngineContext CreateEngineContext(EngineEnvironment environment);
        
        EngineContext CreateSetupContext(EngineEnvironment environment);
    }
}
