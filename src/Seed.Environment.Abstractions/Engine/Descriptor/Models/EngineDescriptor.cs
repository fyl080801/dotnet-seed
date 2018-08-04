using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Seed.Environment.Engine.Descriptor.Models
{
    public class EngineDescriptor
    {
        [Key]
        public int Id { get; set; }

        public int SerialNumber { get; set; }

        public IList<EngineFeature> Features { get; set; } = new List<EngineFeature>();

        public IList<EngineParameter> Parameters { get; set; } = new List<EngineParameter>();
    }
}