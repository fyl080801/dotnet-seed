using Seed.Plugins.Descriptors;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Seed.Plugins.Feature
{
    public class FeatureBuildingContext
    {
        public IDescriptorInfo DescriptorInfo { get; set; }
        public IPluginInfo PluginInfo { get; set; }

        public string FeatureId { get; set; }
        public string FeatureName { get; set; }
        public IDictionary<string, string> DescriptorDetails { get; set; }
        public IDictionary<string, string> FeatureDetails { get; set; }
        public int Priority { get; set; }
        public string Category { get; set; }
        public string Description { get; set; }
        public string[] FeatureDependencyIds { get; set; }
    }
}