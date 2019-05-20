using SeedCore.Environment.Extensions.Features;

namespace SeedCore.Environment.Extensions
{
    public class ExtensionPriorityStrategy : IExtensionPriorityStrategy
    {
        public int GetPriority(IFeatureInfo feature)
        {
            return feature.Priority;
        }
    }
}