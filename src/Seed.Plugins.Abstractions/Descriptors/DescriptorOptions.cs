using System;
using System.Collections.Generic;
using System.Text;

namespace Seed.Plugins.Abstractions.Descriptors
{
    public class DescriptorOptions
    {
        public IList<DescriptorOption> Options { get; } = new List<DescriptorOption>();
    }
}
