using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Seed.Environment.Engine.Descriptors;
using Seed.Plugins.Feature;

namespace Seed.Environment.Engine
{
    public class EngineDescriptorFeaturesManager : IEngineDescriptorFeaturesManager
    {
        public Task<IEnumerable<IFeatureInfo>> DisableFeaturesAsync(EngineDescriptor engineDescriptor, IEnumerable<IFeatureInfo> features)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<IFeatureInfo>> DisableFeaturesAsync(EngineDescriptor engineDescriptor, IEnumerable<IFeatureInfo> features, bool force)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<IFeatureInfo>> EnableFeaturesAsync(EngineDescriptor engineDescriptor, IEnumerable<IFeatureInfo> features)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<IFeatureInfo>> EnableFeaturesAsync(EngineDescriptor engineDescriptor, IEnumerable<IFeatureInfo> features, bool force)
        {
            throw new NotImplementedException();
        }
    }
}
