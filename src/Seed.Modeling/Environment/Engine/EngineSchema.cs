using Seed.Environment.Engine.Descriptors;
using Seed.Plugins.Feature;
using System;
using System.Collections.Generic;

namespace Seed.Environment.Engine
{
    public class EngineSchema
    {
        public EngineSettings Settings { get; set; }

        public EngineDescriptor Descriptor { get; set; }

        public IDictionary<Type, FeatureEntry> Dependencies { get; set; }
    }
}
