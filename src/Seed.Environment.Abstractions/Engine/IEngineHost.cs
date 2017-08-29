using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Seed.Environment.Abstractions.Engine
{
    public interface IEngineHost
    {
        void Initialize();

        EngineContext GetOrCreateContext(EngineSettings settings);

        void UpdateSettings(EngineSettings settings);

        void ReloadContext(EngineSettings settings);

        Task<EngineContext> CreateContextAsync(EngineSettings settings);

        IEnumerable<EngineContext> GetContexts();
    }
}
