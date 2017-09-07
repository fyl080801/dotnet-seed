using Seed.Plugins.Feature;
using System;
using System.Collections.Generic;
using System.Text;

namespace Seed.Plugins
{
    public interface IPluginPriorityStrategy
    {
        int GetPriority(IFeatureInfo feature);
    }
}
