using Seed.Plugins.Features;

namespace Seed.Plugins
{
    public interface IPluginPriorityStrategy
    {
        int GetPriority(IFeatureInfo feature);
    }
}
