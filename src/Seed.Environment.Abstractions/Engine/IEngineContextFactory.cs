using Seed.Environment.Abstractions.Engine.Descriptors;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Seed.Environment.Abstractions.Engine
{
    /// <summary>
    /// 负责创建 EngineContext
    /// </summary>
    public interface IEngineContextFactory
    {
        /// <summary>
        /// 异步创建 Context
        /// </summary>
        /// <param name="settings"></param>
        /// <returns></returns>
        Task<EngineContext> CreateContextAsync(EngineSettings settings);

        /// <summary>
        /// 创建系统安装时的 Context
        /// </summary>
        /// <param name="settings"></param>
        /// <returns></returns>
        Task<EngineContext> CreateSetupContextAsync(EngineSettings settings);

        /// <summary>
        /// 根据描述信息创建 Context
        /// </summary>
        /// <param name="settings"></param>
        /// <param name="descriptor"></param>
        /// <returns></returns>
        Task<EngineContext> CreateDescribedContextAsync(EngineSettings settings, EngineDescriptor descriptor);
    }
}
