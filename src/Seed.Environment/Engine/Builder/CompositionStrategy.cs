using Microsoft.Extensions.Logging;
using Seed.Environment.Engine.Descriptors;
using Seed.Modules;
using Seed.Plugins;
using Seed.Plugins.Features;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Seed.Environment.Engine.Builder
{
    public class CompositionStrategy : ICompositionStrategy
    {
        private readonly IPluginManager _pluginManager;
        private readonly ILogger _logger;

        public CompositionStrategy(IPluginManager pluginManager, ILogger<CompositionStrategy> logger)
        {
            _pluginManager = pluginManager;
            _logger = logger;
        }

        public async Task<EngineSchema> ComposeAsync(EngineSettings settings, EngineDescriptor descriptor)
        {
            if (_logger.IsEnabled(LogLevel.Debug))
            {
                _logger.LogDebug("Composing schema");
            }

            var featureNames = descriptor.Features.Select(x => x.Id).ToArray();

            var features = await _pluginManager.LoadFeaturesAsync(featureNames);

            var entries = new Dictionary<Type, FeatureEntry>();

            foreach (var feature in features)
            {
                foreach (var exportedType in feature.ExportedTypes)
                {
                    var requiredFeatures = RequireFeaturesAttribute.GetRequiredFeatureNamesForType(exportedType);

                    if (requiredFeatures.All(x => featureNames.Contains(x)))
                    {
                        entries.Add(exportedType, feature);
                    }
                }
            }

            var result = new EngineSchema
            {
                Settings = settings,
                Descriptor = descriptor,
                Dependencies = entries
            };

            if (_logger.IsEnabled(LogLevel.Debug))
            {
                _logger.LogDebug("Done composing schema");
            }
            return result;
        }
    }
}
