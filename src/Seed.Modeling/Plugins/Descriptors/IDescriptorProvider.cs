using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Seed.Plugins.Descriptors
{
    public interface IDescriptorProvider
    {
        int Order { get; }

        IConfigurationBuilder GetConfigurationBuilder(IConfigurationBuilder builder, string path);
    }
}