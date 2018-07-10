using System;
using System.Collections.Generic;
using Seed.Environment.Engine.Descriptor.Models;
using Seed.Environment.Plugins.Features;

namespace Seed.Environment.Engine.Builders.Models
{
    public class EngineSchema
    {
        public EngineSettings Settings { get; set; }
        public EngineDescriptor Descriptor { get; set; }

        public IDictionary<Type, FeatureEntry> Dependencies { get; set; }
    }
}