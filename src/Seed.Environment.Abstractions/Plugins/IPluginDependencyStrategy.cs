using Seed.Environment.Plugins.Features;

namespace Seed.Environment.Plugins
{
    public interface IPluginDependencyStrategy
    {
        bool HasDependency(IFeatureInfo observer, IFeatureInfo subject);
    }
}
