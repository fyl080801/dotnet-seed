using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Text;

namespace Seed.Plugins.Abstractions
{
    public interface IDescriptorInfo
    {
        string Name { get; }

        string Description { get; }

        string Category { get; }

        string Author { get; }

        Version Version { get; }

        IEnumerable<string> Tags { get; }

        IConfigurationRoot ConfigurationRoot { get; }
    }
}
