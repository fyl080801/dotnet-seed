using Seed.Plugins.Features;

namespace Seed.Plugins
{
    public interface IPluginDependencyStrategy
    {
        bool HasDependency(IFeatureInfo observer, IFeatureInfo subject);
    }
}
