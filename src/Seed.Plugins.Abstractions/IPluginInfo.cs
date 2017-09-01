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

        IFileInfo PluginFileInfo { get; }

        string SubPath { get; }

        bool Exists { get; }

        //IManifestInfo Manifest { get; }

        IEnumerable<IFeatureInfo> Features { get; }
    }
}
