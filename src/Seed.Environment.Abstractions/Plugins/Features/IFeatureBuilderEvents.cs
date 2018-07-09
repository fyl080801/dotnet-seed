namespace Seed.Environment.Plugins.Features
{
    public interface IFeatureBuilderEvents
    {
        void Building(FeatureBuildingContext context);

        void Built(IFeatureInfo featureInfo);
    }

    public class FeatureBuildingContext
    {
        public IManifestInfo ManifestInfo { get; set; }
        public IPluginInfo PluginInfo { get; set; }

        public string FeatureId { get; set; }
        public string FeatureName { get; set; }
        public int Priority { get; set; }
        public string Category { get; set; }
        public string Description { get; set; }
        public string[] FeatureDependencyIds { get; set; }
        public bool DefaultTenantOnly { get; set; }
    }

    public abstract class FeatureBuilderEvents : IFeatureBuilderEvents
    {
        public virtual void Building(FeatureBuildingContext context) { }

        public virtual void Built(IFeatureInfo featureInfo) { }
    }
}
