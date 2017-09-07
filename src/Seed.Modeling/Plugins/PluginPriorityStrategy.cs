using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Seed.Plugins.Feature;

namespace Seed.Plugins
{
    public class PluginPriorityStrategy : IPluginPriorityStrategy
    {
        public int GetPriority(IFeatureInfo feature)
        {
            return feature.Priority;
        }
    }
}