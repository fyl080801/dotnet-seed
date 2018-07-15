using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Seed.Modules.Manifest
{
    [AttributeUsage(AttributeTargets.Assembly, AllowMultiple = false, Inherited = false)]
    public class ModuleAttribute : FeatureAttribute
    {
        public ModuleAttribute()
        {
        }

        public new bool Exists => Id != null;

        public new string Id { get; internal set; }

        public string Author { get; set; } = String.Empty;

        public string Website { get; set; } = String.Empty;

        public string Version { get; set; } = "0.0";

        public string[] Tags { get; set; } = Enumerable.Empty<string>().ToArray();

        public List<FeatureAttribute> Features { get; } = new List<FeatureAttribute>();
    }
}
