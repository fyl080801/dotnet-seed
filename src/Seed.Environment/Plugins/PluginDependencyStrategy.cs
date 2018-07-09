using System.Linq;
using Seed.Environment.Plugins.Features;

namespace Seed.Environment.Plugins
{
    public class PluginDependencyStrategy : IPluginDependencyStrategy
    {
        public bool HasDependency(IFeatureInfo observer, IFeatureInfo subject)
        {
            return observer.Dependencies.Contains(subject.Id);
        }
    }
}