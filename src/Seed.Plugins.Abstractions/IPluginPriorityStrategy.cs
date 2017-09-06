using Seed.Plugins.Abstractions.Feature;
using System;
using System.Collections.Generic;
using System.Text;

namespace Seed.Plugins.Abstractions
{
    public interface IPluginPriorityStrategy
    {
        int GetPriority(IFeatureInfo feature);
    }
}
