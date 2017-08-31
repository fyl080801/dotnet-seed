using System;
using System.Collections.Generic;
using System.Text;

namespace Seed.Plugin.Abstractions.Feature
{
    public abstract class FeatureEntry
    {
        public IFeatureInfo FeatureInfo { get; protected set; }

        public IEnumerable<Type> Exports { get; protected set; }
    }
}
