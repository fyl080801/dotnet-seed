using Seed.Plugins;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Seed.Environment.Engine.Descriptors
{
    public class AllFeaturesEngineDescriptorManager : IEngineDescriptorManager
    {
        private readonly IPluginManager _pluginManager;
        private EngineDescriptor _engineDescriptor;

        public AllFeaturesEngineDescriptorManager(IPluginManager pluginManager)
        {
            _pluginManager = pluginManager;
        }

        public Task<EngineDescriptor> GetEngineDescriptorAsync()
        {
            if (_engineDescriptor == null)
            {
                _engineDescriptor = new EngineDescriptor
                {
                    Features = _pluginManager.GetFeatures().Select(x => new EngineFeature { Id = x.Id }).ToList()
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
