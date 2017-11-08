using System;
using System.Collections.Generic;
using System.Text;

namespace Seed.Plugins.Feature
{
    [AttributeUsage(AttributeTargets.Class, AllowMultiple = false)]
    public class FeatureAttribute : Attribute
    {
        public FeatureAttribute(string featureName)
        {
            FeatureName = featureName;
        }

        public string FeatureName { get; set; }
    }
}
