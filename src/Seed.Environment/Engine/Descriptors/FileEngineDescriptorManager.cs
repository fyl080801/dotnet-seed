using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Seed.Environment.Engine.Descriptors
{
    public class FileEngineDescriptorManager : IEngineDescriptorManager
    {
        public FileEngineDescriptorManager()
        {

        }

        public Task<EngineDescriptor> GetEngineDescriptorAsync()
        {
            throw new NotImplementedException();
        }

        public Task UpdateEngineDescriptorAsync(int serialNumber, IEnumerable<EngineFeature> enabledFeatures, IEnumerable<EngineParameter> parameters)
        {
            throw new NotImplementedException();
        }
    }
}
