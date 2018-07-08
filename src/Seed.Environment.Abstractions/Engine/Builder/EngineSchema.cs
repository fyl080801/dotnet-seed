using Seed.Environment.Engine.Descriptors;
using Seed.Plugins.Features;
using System;
using System.Collections.Generic;

namespace Seed.Environment.Engine.Builder
{
    public class EngineSchema
    {
        public EngineSettings Settings { get; set; }

        public EngineDescriptor Descriptor { get; set; }

        public IDictionary<Type, FeatureEntry> Dependencies { get; set; }
    }
}
