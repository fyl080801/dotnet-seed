using Seed.Plugins.Features;

namespace Seed.Plugins
{
    public class PluginPriorityStrategy : IPluginPriorityStrategy
    {
        public int GetPriority(IFeatureInfo feature)
        {
            return feature.Priority;
        }
    }
}