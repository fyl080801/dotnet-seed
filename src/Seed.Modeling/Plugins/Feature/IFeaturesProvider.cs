using Seed.Plugins.Descriptors;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Seed.Plugins.Feature
{
    public interface IFeaturesProvider
    {
        IEnumerable<IFeatureInfo> GetFeatures(IPluginInfo pluginInfo, IDescriptorInfo descriptorInfo);
    }
}