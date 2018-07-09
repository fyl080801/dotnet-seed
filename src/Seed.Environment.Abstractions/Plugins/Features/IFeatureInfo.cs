namespace Seed.Environment.Plugins.Features
{
    public interface IFeatureInfo
    {
        string Id { get; }
        string Name { get; }
        int Priority { get; }
        string Category { get; }
        string Description { get; }
        bool DefaultTenantOnly { get; }
        IPluginInfo Plugin { get; }
        string[] Dependencies { get; }
    }
}
