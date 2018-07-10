using Seed.Environment.Engine.Builders;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Seed.Environment.Engine
{
    public interface IEngineHost
    {
        void Initialize();

        EngineContext GetOrCreateEngineContext(EngineSettings settings);

        void UpdateEngineSettings(EngineSettings settings);

        void ReloadEngineContext(EngineSettings settings);

        Task<EngineContext> CreateEngineContextAsync(EngineSettings settings);

        IEnumerable<EngineContext> ListEngineContexts();
    }
}