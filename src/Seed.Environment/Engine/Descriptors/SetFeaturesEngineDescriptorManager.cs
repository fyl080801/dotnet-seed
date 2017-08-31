using Seed.Environment.Abstractions.Engine;
using Seed.Environment.Abstractions.Engine.Descriptors;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Seed.Environment.Engine.Descriptors
{
    public class SetFeaturesEngineDescriptorManager : IEngineDescriptorManager
    {
        private readonly IEnumerable<EngineFeature> _engineFeatures;
        private EngineDescriptor _engineDescriptor;

        public SetFeaturesEngineDescriptorManager(IEnumerable<EngineFeature> engineFeatures)
        {
            _engineFeatures = engineFeatures;
        }

        public Task<EngineDescriptor> GetEngineDescriptorAsync()
        {
            if (_engineDescriptor == null)
            {
                _engineDescriptor = new EngineDescriptor
                {
                    Features = _engineFeatures.ToList()
                };
            }

            return Task.FromResult(_engineDescriptor);
        }

        public Task UpdateEngineDescriptorAsync(int priorSerialNumber, IEnumerable<EngineFeature> enabledFeatures, IEnumerable<EngineParameter> parameters)
        {
            return Task.CompletedTask;
        }
    }
}
