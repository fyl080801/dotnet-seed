using System;
using System.Collections.Generic;
using System.Text;

namespace Seed.Environment.Engine
{
    public class EngineState
    {
        public int Id { get; set; }

        public List<EngineFeatureState> Features { get; } = new List<EngineFeatureState>();
    }
}
