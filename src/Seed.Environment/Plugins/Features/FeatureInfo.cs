namespace Seed.Environment.Plugins.Features
{
    public class FeatureInfo : IFeatureInfo
    {
        public FeatureInfo(
            string id,
            string name,
            int priority,
            string category,
            string description,
            IPluginInfo extension,
            string[] dependencies,
            bool defaultTenantOnly,
            bool allowManage)
        {
            Id = id;
            Name = name;
            Priority = priority;
            Category = category;
            Description = description;
            Plugin = extension;
            Dependencies = dependencies;
            DefaultTenantOnly = defaultTenantOnly;
            ManageDisallowed = allowManage;
        }

        public string Id { get; }

        public string Name { get; }

        public int Priority { get; }

        public string Category { get; }

        public string Description { get; }

        public bool DefaultTenantOnly { get; }

        public bool ManageDisallowed { get; }

        public IPluginInfo Plugin { get; }

        public string[] Dependencies { get; }
    }
}
