using Seed.Plugins.Feature;
using System;
using System.Collections.Generic;
using System.Text;

namespace Seed.Plugins
{
    /// <summary>
    /// 模块优先级策略
    /// </summary>
    public interface IPluginPriorityStrategy
    {
        int GetPriority(IFeatureInfo feature);
    }
}
