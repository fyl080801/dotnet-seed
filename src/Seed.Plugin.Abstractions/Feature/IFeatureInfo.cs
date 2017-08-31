using System;
using System.Collections.Generic;
using System.Text;

namespace Seed.Plugin.Abstractions.Feature
{
    public interface IFeatureInfo
    {
        string Id { get; }
        string Name { get; }
        int Priority { get; }
        string Category { get; }
        string Description { get; }
        IPluginInfo Plugin { get; }
        string[] Dependencies { get; }
    }
}
