using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Seed.Plugins.Abstractions.Feature
{
    public class NonCompiledFeatureEntry : FeatureEntry
    {
        public NonCompiledFeatureEntry(IFeatureInfo featureInfo)
        {
            FeatureInfo = featureInfo;
            Exports = Enumerable.Empty<Type>();
        }
    }
}
