using Seed.Plugins.Feature;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Seed.Environment.Engine
{
    /// <summary>
    /// Engine 的特性管理接口
    /// </summary>
    public interface IEngineFeaturesManager
    {
        /// <summary>
        /// 获取启用的特性
        /// </summary>
        /// <returns></returns>
        Task<IEnumerable<IFeatureInfo>> GetEnabledFeaturesAsync();

        /// <summary>
        /// 启用特性
        /// </summary>
        /// <param name="features"></param>
        /// <returns></returns>
        Task<IEnumerable<IFeatureInfo>> EnableFeaturesAsync(IEnumerable<IFeatureInfo> features);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="features"></param>
        /// <param name="force"></param>
        /// <returns></returns>
        Task<IEnumerable<IFeatureInfo>> EnableFeaturesAsync(IEnumerable<IFeatureInfo> features, bool force);

        /// <summary>
        /// 获取禁用的特性
        /// </summary>
        /// <returns></returns>
        Task<IEnumerable<IFeatureInfo>> GetDisabledFeaturesAsync();

        /// <summary>
        /// 禁用特性
        /// </summary>
        /// <param name="features"></param>
        /// <returns></returns>
        Task<IEnumerable<IFeatureInfo>> DisableFeaturesAsync(IEnumerable<IFeatureInfo> features);

        /// <summary>
        /// 
        /// </summary>
        /// <param name="features"></param>
        /// <param name="force"></param>
        /// <returns></returns>
        Task<IEnumerable<IFeatureInfo>> DisableFeaturesAsync(IEnumerable<IFeatureInfo> features, bool force);
    }
}
