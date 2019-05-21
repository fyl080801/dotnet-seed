using SeedCore.Addon.Features;

namespace SeedCore.Addon
{
    public interface IExtensionPriorityStrategy
    {
        int GetPriority(IFeatureInfo feature);
    }
}
