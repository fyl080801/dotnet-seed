using SeedCore.Environment.Extensions.Features;

namespace SeedCore.Addon
{
    public interface IExtensionPriorityStrategy
    {
        int GetPriority(IFeatureInfo feature);
    }
}
