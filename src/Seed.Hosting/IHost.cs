using Seed.Environment.Engine;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Seed.Hosting
{
    public interface IHost
    {
        void Initialize();

        EngineContext GetOrCreateEngineContext(EngineEnvironment environment);
        
        EngineContext CreateEngineContext(EngineEnvironment environment);

        IEnumerable<EngineContext> GetEngineContexts();

        void UpdateEngineSettings(EngineEnvironment environment);

        void ReloadEngineContext(EngineEnvironment environment);
    }
}
