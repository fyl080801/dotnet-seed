using Seed.Environment.Engine.Descriptor.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Seed.Environment.Engine.Descriptor.Settings
{
    public class FileEngineDescriptorManager : IEngineDescriptorManager
    {
        private readonly EngineSettingsWithTenants _engineSettings;
        private readonly IEnumerable<EngineFeature> _alwaysEnabledFeatures;
        private EngineDescriptor _engineDescriptor;

        public FileEngineDescriptorManager(
            EngineSettingsWithTenants engineSettings,
            IEnumerable<EngineFeature> engineFeatures)
        {
            _engineSettings = engineSettings ?? throw new ArgumentException(nameof(engineSettings));
            _alwaysEnabledFeatures = engineFeatures.Where(f => f.AlwaysEnabled).ToArray();
        }

        public Task<EngineDescriptor> GetEngineDescriptorAsync()
        {
            if (_engineDescriptor == null)
            {
                var features = _alwaysEnabledFeatures.Concat(_engineSettings.Features
                    .Select(id => new EngineFeature(id))).Distinct().ToList();

                _engineDescriptor = new EngineDescriptor
                {
                    Features = features
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
