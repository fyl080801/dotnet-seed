using Seed.Environment.Engine.Descriptors;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Seed.Environment.Engine.Data
{
    public class EngineDescriptorManager : IEngineDescriptorManager
    {
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
