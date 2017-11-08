using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Seed.Environment.Engine.Descriptors
{
    public interface IEngineDescriptorManager
    {
        Task<EngineDescriptor> GetEngineDescriptorAsync();

        Task UpdateEngineDescriptorAsync(int serialNumber, IEnumerable<EngineFeature> enabledFeatures, IEnumerable<EngineParameter> parameters);
    }
}
