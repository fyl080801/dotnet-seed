using System;
using System.Collections.Generic;
using Seed.Modules.Manifest;

namespace Seed.Environment.Plugins
{
    public interface IManifestInfo
    {
        bool Exists { get; }
        string Name { get; }
        string Description { get; }
        //string Type { get; }
        string Author { get; }
        string Website { get; }
        Version Version { get; }
        IEnumerable<string> Tags { get; }
        ModuleAttribute ModuleInfo { get; }
    }
}
