using Seed.Environment.Abstractions.Engine;
using Seed.Environment.Abstractions.Engine.Descriptors;
using System;
using System.Collections.Generic;
using System.Text;
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
