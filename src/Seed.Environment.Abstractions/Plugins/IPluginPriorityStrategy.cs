using Seed.Environment.Plugins.Features;

namespace Seed.Environment.Plugins
{
    public interface IPluginPriorityStrategy
    {
        int GetPriority(IFeatureInfo feature);
    }
}
