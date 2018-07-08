using System.Collections.Generic;

namespace SeedModules.Features.Models
{
    public class FeatureGroupModel
    {
        public string Category { get; set; }

        public IEnumerable<FeatureModel> Features { get; set; }
    }
}