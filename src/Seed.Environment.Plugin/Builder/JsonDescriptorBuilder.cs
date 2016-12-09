using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Seed.Environment.Plugin.Builder
{
    /// <summary>
    /// 解析 json 风格的 plugin 定义
    /// </summary>
    public class JsonDescriptorBuilder : BaseDescriptorBuilder, IDescriptorBuilder
    {
        readonly JObject _pluginJson;

        public JsonDescriptorBuilder(JObject pluginJson)
        {
            _pluginJson = pluginJson;
        }

        public JsonDescriptorBuilder(string jsonString)
            : this(JObject.Parse(jsonString))
        {

        }

        public override PluginDescriptor Build()
        {
            return new PluginDescriptor()
            {
                Author = _pluginJson["author"]?.ToString(),
                Description = _pluginJson["description"]?.ToString(),
                Id = _pluginJson["id"]?.ToString(),
                Name = _pluginJson["name"]?.ToString(),
                Tags = _pluginJson["tags"]?.ToArray().Select(e => e.ToString()).ToList() ?? new List<string>(),
                Version = Version.Parse(_pluginJson["version"]?.ToString()),
                IncludePaths = _pluginJson["includePaths"]?.Select(e => e.ToString()).ToList() ?? new List<string>(),
                Dependencies = _pluginJson["dependencies"]?
                    .ToArray()
                    .Select(e => new Dependency()
                    {
                        Id = e.Value<string>("id")?.ToString(),
                        Condition = e.Value<string>("condition")?.ToString()
                    })
                    .ToList() ?? new List<Dependency>()
            };
        }
    }
}
