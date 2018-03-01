using System.Collections.Generic;
using Seed.Plugins.Feature;

namespace SeedModules.Features.Models
{
    public class FeatureModel
    {
        public IFeatureInfo Descriptor { get; set; }

        public bool Enabled { get; set; }

        public IEnumerable<IFeatureInfo> Dependencies { get; set; }
    }
}