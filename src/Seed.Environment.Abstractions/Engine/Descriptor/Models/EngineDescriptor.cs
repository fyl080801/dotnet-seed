using System.Collections.Generic;

namespace Seed.Environment.Engine.Descriptor.Models
{
    public class EngineDescriptor
    {
        public int Id { get; set; }

        public int SerialNumber { get; set; }

        public IList<EngineFeature> Features { get; set; } = new List<EngineFeature>();

        public IList<EngineParameter> Parameters { get; set; } = new List<EngineParameter>();
    }
}