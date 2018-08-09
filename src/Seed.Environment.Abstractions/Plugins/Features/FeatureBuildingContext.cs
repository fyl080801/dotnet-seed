using System;
using System.Collections.Generic;
using System.Text;

namespace Seed.Environment.Plugins.Features
{
    public class FeatureBuildingContext
    {
        public IManifestInfo ManifestInfo { get; set; }

        public IPluginInfo PluginInfo { get; set; }

        public string FeatureId { get; set; }

        public string FeatureName { get; set; }

        public int Priority { get; set; }

        public string Category { get; set; }

        public string Description { get; set; }

        public string[] FeatureDependencyIds { get; set; }

        public bool DefaultTenantOnly { get; set; }

        public bool ManageDisallowed { get; set; }
    }
}
