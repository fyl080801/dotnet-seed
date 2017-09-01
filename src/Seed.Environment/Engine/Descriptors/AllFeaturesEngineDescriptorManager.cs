using Seed.Environment.Abstractions.Engine;
using Seed.Environment.Abstractions.Engine.Descriptors;
using Seed.Plugins.Abstractions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Seed.Environment.Engine.Descriptors
{
    public class AllFeaturesEngineDescriptorManager : IEngineDescriptorManager
    {
        private readonly IPluginManager _pluginManager;
        private EngineDescriptor _shellDescriptor;

        public AllFeaturesEngineDescriptorManager(IPluginManager pluginManager)
        {
            _pluginManager = pluginManager;
        }

        public Task<EngineDescriptor> GetEngineDescriptorAsync()
        {
            if (_shellDescriptor == null)
            {
                _shellDescriptor = new EngineDescriptor
                {
                    Features = _pluginManager.GetFeatures().Select(x => new EngineFeature { Id = x.Id }).ToList()
                };
            }

            return Task.FromResult(_shellDescriptor);
        }

        public Task UpdateEngineDescriptorAsync(int priorSerialNumber, IEnumerable<EngineFeature> enabledFeatures, IEnumerable<EngineParameter> parameters)
        {
            return Task.CompletedTask;
        }
    }
}
