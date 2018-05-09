using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Seed.Plugins.Feature;
using Seed.Plugins;
using Seed.Environment.Engine.Descriptors;

namespace Seed.Environment.Engine
{
    public class EngineFeaturesManager : IEngineFeaturesManager
    {
        private readonly IPluginManager _pluginManager;
        private readonly EngineDescriptor _engineDescriptor;
        private readonly IEngineDescriptorFeaturesManager _engineDescriptorFeaturesManager;

        public EngineFeaturesManager(
            IPluginManager pluginManager,
            EngineDescriptor engineDescriptor,
            IEngineDescriptorFeaturesManager engineDescriptorFeaturesManager)
        {
            _pluginManager = pluginManager;
            _engineDescriptor = engineDescriptor;
            _engineDescriptorFeaturesManager = engineDescriptorFeaturesManager;
        }

        public Task<IEnumerable<IFeatureInfo>> GetEnabledFeaturesAsync()
        {
            return Task.FromResult(_pluginManager.GetFeatures().Where(f => _engineDescriptor.Features.Any(sf => sf.Id == f.Id)));
        }

        public Task<IEnumerable<IFeatureInfo>> EnableFeaturesAsync(IEnumerable<IFeatureInfo> features)
        {
            return _engineDescriptorFeaturesManager.EnableFeaturesAsync(_engineDescriptor, features);
        }

        public Task<IEnumerable<IFeatureInfo>> EnableFeaturesAsync(IEnumerable<IFeatureInfo> features, bool force)
        {
            return _engineDescriptorFeaturesManager.EnableFeaturesAsync(_engineDescriptor, features, force);
        }

        public Task<IEnumerable<IFeatureInfo>> GetDisabledFeaturesAsync()
        {
            return Task.FromResult(_pluginManager.GetFeatures().Where(f => _engineDescriptor.Features.All(sf => sf.Id != f.Id)));
        }

        public Task<IEnumerable<IFeatureInfo>> DisableFeaturesAsync(IEnumerable<IFeatureInfo> features)
        {
            return _engineDescriptorFeaturesManager.DisableFeaturesAsync(_engineDescriptor, features);
        }

        public Task<IEnumerable<IFeatureInfo>> DisableFeaturesAsync(IEnumerable<IFeatureInfo> features, bool force)
        {
            return _engineDescriptorFeaturesManager.DisableFeaturesAsync(_engineDescriptor, features, force);
        }
    }
}