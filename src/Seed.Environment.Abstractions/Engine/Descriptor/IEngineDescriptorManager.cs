using Seed.Environment.Engine.Descriptor.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Seed.Environment.Engine.Descriptor
{
    public interface IEngineDescriptorManager
    {
        Task<EngineDescriptor> GetEngineDescriptorAsync();

        Task UpdateEngineDescriptorAsync(
            int priorSerialNumber,
            IEnumerable<EngineFeature> enabledFeatures,
            IEnumerable<EngineParameter> parameters);
    }
}