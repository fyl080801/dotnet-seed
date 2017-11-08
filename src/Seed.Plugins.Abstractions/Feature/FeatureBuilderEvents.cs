using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Seed.Plugins.Feature
{
    public abstract class FeatureBuilderEvents : IFeatureBuilderEvents
    {
        public virtual void Building(FeatureBuildingContext context) { }

        public virtual void Built(IFeatureInfo featureInfo) { }
    }
}