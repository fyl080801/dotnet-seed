using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Seed.Plugins
{
    public class PluginExpanderOptionsSetup : ConfigureOptions<PluginExpanderOptions>
    {
        public PluginExpanderOptionsSetup()
            : base(options => { })
        {
        }
    }
}