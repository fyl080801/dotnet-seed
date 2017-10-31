using System;
using System.Collections.Generic;
using System.Text;

namespace Seed.Plugins.Feature
{
    /// <summary>
    /// 类型查找(TypeFinder)
    /// </summary>
    public interface ITypeFeatureProvider
    {
        /// <summary>
        /// 获得特定类型依赖项的特性
        /// </summary>
        /// <param name="dependency"></param>
        /// <returns></returns>
        IFeatureInfo GetFeatureForDependency(Type dependency);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="type"></param>
        /// <param name="feature"></param>
        void TryAdd(Type type, IFeatureInfo feature);
    }
}
