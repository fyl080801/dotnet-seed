using Seed.Environment.Abstractions.Engine.Descriptors;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Seed.Environment.Abstractions.Engine
{
    /// <summary>
    /// 
    /// </summary>
    public interface ICompositionStrategy
    {
        /// <summary>
        /// 组合 Engine 引用 Plugin 的特性
        /// </summary>
        /// <param name="settings"></param>
        /// <param name="descriptor"></param>
        /// <returns></returns>
        /// <remarks>只是把特性输出的类型写入一个集合,实际引用在 Plugin 中</remarks>
        Task<EngineSchema> ComposeAsync(EngineSettings settings, EngineDescriptor descriptor);
    }
}
