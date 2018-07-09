using Seed.Environment.Plugins.Features;

namespace Seed.Environment.Plugins
{
    public class PluginPriorityStrategy : IPluginPriorityStrategy
    {
        public int GetPriority(IFeatureInfo feature)
        {
            return feature.Priority;
        }
    }
}