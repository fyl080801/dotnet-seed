using Seed.Plugins.Feature;
using System;
using System.Collections.Generic;
using System.Text;

namespace Seed.Plugins
{
    /// <summary>
    /// 
    /// </summary>
    public interface IPluginDependencyStrategy
    {
        /// <summary>
        /// 插件特性是否有依赖关系
        /// </summary>
        /// <param name="source">源插件</param>
        /// <param name="objective"></param>
        /// <returns></returns>
        bool HasDependency(IFeatureInfo source, IFeatureInfo objective);
    }
}
