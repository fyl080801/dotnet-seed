using Seed.Plugins.Feature;

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