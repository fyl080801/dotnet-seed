using Seed.Environment.Engine.Descriptors;
using Seed.Plugins.Feature;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Seed
{
    public delegate void FeatureDependencyNotificationHandler(string messageFormat, IFeatureInfo feature, IEnumerable<IFeatureInfo> features);

    public interface IEngineDescriptorFeaturesManager
    {
        Task<IEnumerable<IFeatureInfo>> EnableFeaturesAsync(EngineDescriptor engineDescriptor, IEnumerable<IFeatureInfo> features);

        Task<IEnumerable<IFeatureInfo>> EnableFeaturesAsync(EngineDescriptor engineDescriptor, IEnumerable<IFeatureInfo> features, bool force);

        Task<IEnumerable<IFeatureInfo>> DisableFeaturesAsync(EngineDescriptor engineDescriptor, IEnumerable<IFeatureInfo> features);

        Task<IEnumerable<IFeatureInfo>> DisableFeaturesAsync(EngineDescriptor engineDescriptor, IEnumerable<IFeatureInfo> features, bool force);
    }
}