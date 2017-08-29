using System;
using System.Collections.Generic;
using System.Text;

namespace Seed.Environment.Abstractions.Engine
{
    public class EngineDescriptor
    {
        public int Id { get; set; }

        public string SerialNumber { get; set; }

        public IList<EngineFeature> Features { get; set; } = new List<EngineFeature>();

        public IList<EngineParameter> Parameters { get; set; } = new List<EngineParameter>();
    }
}
