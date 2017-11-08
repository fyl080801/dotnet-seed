using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Seed.Plugins.Feature
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