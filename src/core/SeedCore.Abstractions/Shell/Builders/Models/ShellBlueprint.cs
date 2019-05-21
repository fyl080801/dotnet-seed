using SeedCore.Shell.Descriptor.Models;
using System;
using System.Collections.Generic;

namespace SeedCore.Shell.Builders.Models
{
    public class ShellBlueprint
    {
        public ShellSettings Settings { get; set; }

        public ShellDescriptor Descriptor { get; set; }

        public IDictionary<Type, FeatureEntry> Dependencies { get; set; }
    }
}