using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Seed.Environment.Engine.Descriptors
{
    /// <summary>
    /// Engine 的描述文件管理接口
    /// </summary>
    public interface IEngineDescriptorManager
    {
        /// <summary>
        /// 获取 Engine 描述文件
        /// </summary>
        /// <returns></returns>
        Task<EngineDescriptor> GetEngineDescriptorAsync();

        /// <summary>
        /// 更新 Engine 描述文件
        /// </summary>
        /// <param name="serialNumber">序列号</param>
        /// <param name="enabledFeatures">启用的特性</param>
        /// <param name="parameters"></param>
        /// <returns></returns>
        Task UpdateEngineDescriptorAsync(int priorSerialNumber, IEnumerable<EngineFeature> enabledFeatures, IEnumerable<EngineParameter> parameters);
    }
}
