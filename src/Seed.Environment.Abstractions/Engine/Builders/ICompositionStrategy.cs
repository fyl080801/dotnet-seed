using Seed.Environment.Engine.Builders.Models;
using Seed.Environment.Engine.Descriptor.Models;
using System.Threading.Tasks;

namespace Seed.Environment.Engine.Builders
{
    public interface ICompositionStrategy
    {
        Task<EngineSchema> ComposeAsync(EngineSettings settings, EngineDescriptor descriptor);
    }
}