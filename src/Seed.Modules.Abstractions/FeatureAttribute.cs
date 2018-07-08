﻿using System;
using System.Collections.Generic;
using System.Text;

namespace Seed.Modules
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
