using Microsoft.Extensions.FileProviders;
using Seed.Plugins.Descriptors;
using Seed.Plugins.Feature;
using System.Collections.Generic;

namespace Seed.Plugins
{
    public interface IPluginInfo
    {
        string Id { get; }

        string Path { get; }

        bool Exists { get; }

        IFileInfo PluginFileInfo { get; }

        IEnumerable<IFeatureInfo> Features { get; }

        IDescriptorInfo Descriptor { get; }
    }
}