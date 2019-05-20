using System;
using System.Collections.Generic;
using System.Linq;

namespace SeedCore.Modules.Manifest
{
    [AttributeUsage(AttributeTargets.Assembly, AllowMultiple = false, Inherited = false)]
    public class ModuleAttribute : FeatureAttribute
    {
        public ModuleAttribute()
        {
        }

        public virtual string Type => "Module";

        public new bool Exists => Id != null;

        public new string Id { get; internal set; }

        public string Author { get; set; } = String.Empty;

        public string Website { get; set; } = String.Empty;

        public string Version { get; set; } = "0.0";

        public string[] Tags { get; set; } = Enumerable.Empty<string>().ToArray();

        public List<FeatureAttribute> Features { get; } = new List<FeatureAttribute>();
    }

    [AttributeUsage(AttributeTargets.Assembly, AllowMultiple = true, Inherited = false)]
    public class FeatureAttribute : Attribute
    {
        public FeatureAttribute()
        {
        }

        public bool Exists => Id != null;

        public string Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; } = String.Empty;

        public string[] Dependencies { get; set; } = Enumerable.Empty<string>().ToArray();

        public string Priority { get; set; } = "0";

        public string Category { get; set; }

        public bool DefaultTenantOnly { get; set; }
    }

    [AttributeUsage(AttributeTargets.Assembly, AllowMultiple = false, Inherited = false)]
    public class ModuleMarkerAttribute : ModuleAttribute
    {
        private string _type;

        public ModuleMarkerAttribute(string name, string type)
        {
            Name = name;
            _type = type;
        }

        public override string Type => _type;
    }

    [AttributeUsage(AttributeTargets.Assembly, AllowMultiple = true, Inherited = false)]
    public class ModuleNameAttribute : Attribute
    {
        public ModuleNameAttribute(string name)
        {
            Name = name ?? String.Empty;
        }

        public string Name { get; }
    }

    [AttributeUsage(AttributeTargets.Assembly, AllowMultiple = true, Inherited = false)]
    public class ModuleAssetAttribute : Attribute
    {
        public ModuleAssetAttribute(string asset)
        {
            Asset = asset ?? String.Empty;
        }

        public string Asset { get; }
    }
}