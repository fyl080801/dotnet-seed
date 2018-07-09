namespace Seed.Environment.Plugins.Features
{
    public class InternalFeatureInfo : IFeatureInfo
    {
        public InternalFeatureInfo(
            string id,
            IPluginInfo pluginInfo)
        {
            Id = id;
            Name = id;
            Priority = 0;
            Category = null;
            Description = null;
            DefaultTenantOnly = false;
            Plugin = pluginInfo;
            Dependencies = new string[0];
        }

        public string Id { get; }
        public string Name { get; }
        public int Priority { get; }
        public string Category { get; }
        public string Description { get; }
        public bool DefaultTenantOnly { get; }
        public IPluginInfo Plugin { get; }
        public string[] Dependencies { get; }
    }
}
