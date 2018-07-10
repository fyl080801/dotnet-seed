using Seed.Environment.Engine.Descriptor.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Seed.Environment.Engine.Descriptor.Settings
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
                    Features = _engineFeatures.Distinct().ToList()
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
