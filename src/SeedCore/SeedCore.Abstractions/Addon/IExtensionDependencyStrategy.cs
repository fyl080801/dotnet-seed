using SeedCore.Addon.Features;

namespace SeedCore.Addon
{
    public interface IExtensionDependencyStrategy
    {
        bool HasDependency(IFeatureInfo observer, IFeatureInfo subject);
    }
}
