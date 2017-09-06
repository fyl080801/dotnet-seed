using System;
using System.Collections.Generic;
using System.Text;

namespace Seed.Plugins.Abstractions.Feature
{
    [AttributeUsage(AttributeTargets.Class, AllowMultiple = false)]
    public class FeatureAttribute : Attribute
    {
        public FeatureAttribute(string featureName)
        {
            FeatureName = featureName;
        }

        /// <summary>
        /// The name of the feaure to assign the component to.
        /// </summary>
        public string FeatureName { get; set; }
    }
}
