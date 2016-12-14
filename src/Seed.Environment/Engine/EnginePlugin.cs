using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Seed.Environment.Engine
{
    public class EnginePlugin
    {
        public string Id { get; set; }

        public IEnumerable<Type> PluginTypes { get; set; } = new HashSet<Type>();

        public EnginePlugin()
        {
        }

        public EnginePlugin(string id)
        {
            Id = id;
        }
    }
}
