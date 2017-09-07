using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Seed.Plugins.Feature;

namespace Seed.Plugins
{
    public class PluginDependencyStrategy : IPluginDependencyStrategy
    {
        public bool HasDependency(IFeatureInfo source, IFeatureInfo objective)
        {
            return source.Dependencies.Contains(objective.Id);
        }
    }
}