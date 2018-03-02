using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Seed.Environment.Engine
{
    public class EngineState
    {
        [Key]
        public int Id { get; set; }

        public List<EngineFeatureState> Features { get; } = new List<EngineFeatureState>();
    }
}
