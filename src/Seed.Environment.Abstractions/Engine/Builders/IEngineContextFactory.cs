using Seed.Environment.Engine.Descriptor.Models;
using System.Threading.Tasks;

namespace Seed.Environment.Engine.Builders
{
    public interface IEngineContextFactory
    {
        Task<EngineContext> CreateEngineContextAsync(EngineSettings settings);

        Task<EngineContext> CreateSetupContextAsync(EngineSettings settings);

        Task<EngineContext> CreateDescribedContextAsync(EngineSettings settings, EngineDescriptor engineDescriptor);
    }
}