using Seed.Plugins.Feature;
using System.Linq;

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