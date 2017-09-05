using Microsoft.Extensions.FileProviders;
using Seed.Plugins.Abstractions.Feature;
using System;
using System.Collections.Generic;
using System.Text;

namespace Seed.Plugins.Abstractions
{
    public interface IPluginInfo
    {
        string Id { get; }

        string SubPath { get; }

        bool Exists { get; }

        IFileInfo PluginFileInfo { get; }

        IDescriptorInfo Descriptor { get; }

        IEnumerable<IFeatureInfo> Features { get; }
    }
}
