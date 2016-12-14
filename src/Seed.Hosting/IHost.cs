using Seed.Environment.Engine;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Seed.Hosting
{
    public interface IHost
    {
        void Initialize();

        EngineContext GetOrCreateEngineContext(EngineVariables variables);
        
        EngineContext CreateEngineContext(EngineVariables variables);

        IEnumerable<EngineContext> GetEngineContexts();

        void UpdateEngineSettings(EngineVariables variables);

        void ReloadEngineContext(EngineVariables variables);
    }
}
