namespace Seed.Environment.Plugins.Features
{
    public interface IFeatureBuilderEvents
    {
        void Building(FeatureBuildingContext context);

        void Built(IFeatureInfo featureInfo);
    }
}
