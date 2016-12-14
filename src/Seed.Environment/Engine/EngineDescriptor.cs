using Seed.Environment.Plugin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Seed.Environment.Engine
{
    public class EngineDescriptor
    {
        public string SerialCode { get; set; }

        public IList<EnginePlugin> Plugins { get; set; } = new List<EnginePlugin>();
    }
}
