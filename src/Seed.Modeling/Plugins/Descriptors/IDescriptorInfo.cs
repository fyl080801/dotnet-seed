using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Seed.Plugins.Descriptors
{
    public interface IDescriptorInfo
    {
        bool Exists { get; }

        string Name { get; }

        string Description { get; }

        string TypeName { get; }

        string Author { get; }

        Version Version { get; }

        IEnumerable<string> Tags { get; }

        IConfigurationRoot ConfigurationRoot { get; }
    }
}