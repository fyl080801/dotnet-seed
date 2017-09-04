using System;
using System.Collections.Generic;
using System.Text;

namespace Seed.Plugins.Abstractions.Feature
{
    /// <summary>
    /// 
    /// </summary>
    public interface ITypeFeatureProvider
    {
        /// <summary>
        /// 
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
