using System.Collections.Generic;
using Newtonsoft.Json;

namespace SeedModules.AngularUI.Rendering
{
    public class UIReference
    {
        [JsonProperty("references")]
        public IDictionary<string, ModuleReference> References { get; set; }

        [JsonProperty("requires")]
        public IEnumerable<string> Requires { get; set; }

        [JsonProperty("patchs")]
        public IEnumerable<string> Patchs { get; set; }
    }

    public class ModuleReference
    {
        [JsonProperty("path")]
        public string Path { get; set; }

        [JsonProperty("shim")]
        public ReferenceShim Shim { get; set; }

        [JsonProperty("noDebug")]
        public bool NoDebug { get; set; }
    }

    public class ReferenceShim
    {
        [JsonProperty("deps")]
        public IEnumerable<string> Dependencies { get; set; }
    }
}