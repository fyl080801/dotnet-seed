using Microsoft.Extensions.Configuration;
using Seed.Environment.Engine.Configuration;
using Seed.Environment.Engine.Descriptor.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Seed.Environment.Engine.Descriptor.Settings
{
    public class ConfiguredFeaturesEngineDescriptorManager : IEngineDescriptorManager
    {
        private readonly IEngineConfiguration _shellConfiguration;
        private readonly IEngineSettingsManager _shellSettingsManager;
        private readonly IEnumerable<EngineFeature> _alwaysEnabledFeatures;
        private EngineDescriptor _shellDescriptor;

        public ConfiguredFeaturesEngineDescriptorManager(
            IEngineConfiguration shellConfiguration,
            IEngineSettingsManager shellSettingsManager,
            IEnumerable<EngineFeature> shellFeatures)
        {
            _shellConfiguration = shellConfiguration;
            _shellSettingsManager = shellSettingsManager;
            _alwaysEnabledFeatures = shellFeatures.Where(f => f.AlwaysEnabled).ToArray();
        }

        public Task<EngineDescriptor> GetEngineDescriptorAsync()
        {
            if (_shellDescriptor == null)
            {
                var configuredFeatures = new ConfiguredFeatures();
                _shellConfiguration.Bind(configuredFeatures);

                var features = _alwaysEnabledFeatures.Concat(configuredFeatures.Features
                    .Select(id => new EngineFeature(id) { AlwaysEnabled = true })).Distinct();

                _shellDescriptor = new EngineDescriptor
                {
                    Features = features.ToList()
                };
            }

            return Task.FromResult(_shellDescriptor);
        }

        public Task UpdateEngineDescriptorAsync(int priorSerialNumber, IEnumerable<EngineFeature> enabledFeatures, IEnumerable<EngineParameter> parameters)
        {
            return Task.CompletedTask;
        }

        private class ConfiguredFeatures
        {
            public string[] Features { get; set; } = new string[] { };
        }
    }
}
