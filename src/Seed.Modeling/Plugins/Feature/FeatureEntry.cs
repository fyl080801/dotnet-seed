using Seed.Plugins.Feature;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Seed.Plugins.Feature
{
    public class FeatureEntry
    {
        public IFeatureInfo FeatureInfo { get; protected set; }

        public IEnumerable<Type> Exports { get; protected set; }
    }
}