using Seed.Environment.Engine.Descriptor.Models;
using System.Threading.Tasks;

namespace Seed.Environment.Engine
{
    public interface IEngineDescriptorManagerEventHandler
    {
        Task Changed(EngineDescriptor descriptor, string tenant);
    }
}
