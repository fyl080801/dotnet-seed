using Microsoft.Extensions.DependencyInjection;
using Seed.Environment.Engine.Builders;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Seed.Environment.Engine
{
    public interface IEngineHost
    {
        Task InitializeAsync();

        Task<EngineContext> GetOrCreateEngineContextAsync(EngineSettings settings);

        Task<IServiceScope> GetScopeAsync(EngineSettings settings);

        Task<(IServiceScope Scope, EngineContext EngineContext)> GetScopeAndContextAsync(EngineSettings settings);

        Task UpdateEngineSettingsAsync(EngineSettings settings);

        Task ReloadEngineContextAsync(EngineSettings settings);

        Task<EngineContext> CreateEngineContextAsync(EngineSettings settings);

        IEnumerable<EngineContext> ListEngineContexts();

        bool TryGetSettings(string name, out EngineSettings settings);

        IEnumerable<EngineSettings> GetAllSettings();
    }
}