using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Seed.Plugins.Descriptors
{
    public class DescriptorOptionsSetup : ConfigureOptions<DescriptorOptions>
    {
        public DescriptorOptionsSetup() : base(options => { })
        {
        }
    }
}