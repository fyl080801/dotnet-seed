using System;
using System.Collections.Generic;
using SeedCore.Addon.Features;
using SeedCore.Shell.Descriptor.Models;

namespace SeedCore.Shell.Builders.Models
{
    public class ShellBlueprint
    {
        public ShellSettings Settings { get; set; }

        public ShellDescriptor Descriptor { get; set; }

        public IDictionary<Type, FeatureEntry> Dependencies { get; set; }
    }
}