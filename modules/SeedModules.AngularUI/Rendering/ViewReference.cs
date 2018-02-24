using System.Collections.Generic;
using Newtonsoft.Json;

namespace SeedModules.AngularUI.Rendering
{
    public class ViewReference
    {
        [JsonProperty("references")]
        public IDictionary<string, ModuleReference> References { get; set; } = new Dictionary<string, ModuleReference>();

        [JsonProperty("requires")]
        public IEnumerable<string> Requires { get; set; } = new HashSet<string>();

        [JsonProperty("patchs")]
        public IEnumerable<string> Patchs { get; set; } = new HashSet<string>();
    }

    public class ModuleReference
    {
        [JsonProperty("path")]
        public string Path { get; set; }

        [JsonProperty("shim")]
        public ReferenceShim Shim { get; set; }

        [JsonProperty("noDebug")]
        public bool NoDebug { get; set; }

        [JsonProperty("isDist")]
        public bool IsDist { get; set; }
    }

    public class ReferenceShim
    {
        [JsonProperty("deps")]
        public IEnumerable<string> Dependencies { get; set; } = new HashSet<string>();
    }
}