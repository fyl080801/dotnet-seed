using System.Collections.Generic;

namespace Seed.Environment.Engine.State
{
    public class EngineState
    {
        public int Id { get; set; }

        public List<EngineFeatureState> Features { get; } = new List<EngineFeatureState>();
    }
}
