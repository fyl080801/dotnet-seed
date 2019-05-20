using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using SeedCore.Environment.Shell.Configuration;
using SeedCore.Environment.Shell.Descriptor.Models;

namespace SeedCore.Environment.Shell.Descriptor.Settings
{
    /// <summary>
    /// Implements <see cref="IShellDescriptorManager"/> by returning the features from configuration.
    /// </summary>
    public class ConfiguredFeaturesShellDescriptorManager : IShellDescriptorManager
    {
        private readonly IShellConfiguration _shellConfiguration;
        private readonly IShellSettingsManager _shellSettingsManager;
        private readonly IEnumerable<ShellFeature> _alwaysEnabledFeatures;
        private ShellDescriptor _shellDescriptor;

        public ConfiguredFeaturesShellDescriptorManager(
            IShellConfiguration shellConfiguration,
            IShellSettingsManager shellSettingsManager,
            IEnumerable<ShellFeature> shellFeatures)
        {
            _shellConfiguration = shellConfiguration;
            _shellSettingsManager = shellSettingsManager;
            _alwaysEnabledFeatures = shellFeatures.Where(f => f.AlwaysEnabled).ToArray();
        }

        public Task<ShellDescriptor> GetShellDescriptorAsync()
        {
            if (_shellDescriptor == null)
            {
                var configuredFeatures = new ConfiguredFeatures();
                _shellConfiguration.Bind(configuredFeatures);

                var features = _alwaysEnabledFeatures.Concat(configuredFeatures.Features
                    .Select(id => new ShellFeature(id) { AlwaysEnabled = true })).Distinct();

                _shellDescriptor = new ShellDescriptor
                {
                    Features = features.ToList()
                };
            }

            return Task.FromResult(_shellDescriptor);
        }

        public Task UpdateShellDescriptorAsync(int priorSerialNumber, IEnumerable<ShellFeature> enabledFeatures, IEnumerable<ShellParameter> parameters)
        {
            return Task.CompletedTask;
        }

        private class ConfiguredFeatures
        {
            public string[] Features { get; set; } = new string[] { };
        }
    }
}
