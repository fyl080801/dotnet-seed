using System;
using System.Collections.Generic;
using System.Text;

namespace Seed.Environment.Abstractions.Engine
{
    public class EngineSchema
    {
        public EngineSettings Settings { get; set; }
        public EngineDescriptor Descriptor { get; set; }

        //public IDictionary<Type, FeatureEntry> Dependencies { get; set; }
    }
}
