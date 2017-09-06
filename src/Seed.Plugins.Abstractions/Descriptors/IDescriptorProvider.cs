using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Text;

namespace Seed.Plugins.Abstractions.Descriptors
{
    public interface IDescriptorProvider
    {
        int Order { get; }

        IConfigurationBuilder GetConfigurationBuilder(IConfigurationBuilder builder, string path);
    }
}
