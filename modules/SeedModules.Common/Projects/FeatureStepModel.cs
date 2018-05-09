using System;
using System.Collections.Generic;
using System.Text;

namespace SeedModules.Common.Projects
{
    internal class FeatureStepModel
    {
        public string Name { get; set; }

        public string[] Disable { get; set; }

        public string[] Enable { get; set; }
    }
}
