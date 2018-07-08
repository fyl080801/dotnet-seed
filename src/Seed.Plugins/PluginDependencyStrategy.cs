using System.Linq;
using Seed.Plugins.Features;

namespace Seed.Plugins
{
    public class PluginDependencyStrategy : IPluginDependencyStrategy
    {
        public bool HasDependency(IFeatureInfo observer, IFeatureInfo subject)
        {
            return observer.Dependencies.Contains(subject.Id);
        }
    }
}