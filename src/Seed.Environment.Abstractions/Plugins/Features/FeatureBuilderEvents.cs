using System;
using System.Collections.Generic;
using System.Text;

namespace Seed.Environment.Plugins.Features
{
    public abstract class FeatureBuilderEvents : IFeatureBuilderEvents
    {
        public virtual void Building(FeatureBuildingContext context) { }

        public virtual void Built(IFeatureInfo featureInfo) { }
    }
}
