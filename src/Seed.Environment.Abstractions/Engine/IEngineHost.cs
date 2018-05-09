using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Seed.Environment.Engine
{
    /// <summary>
    /// Engine 主机
    /// </summary>
    /// <remarks>
    /// 管理所有 EngineContext
    /// Tenant 会话会初始化一个 EngineContext
    /// </remarks>
    public interface IEngineHost
    {
        /// <summary>
        /// 初始化
        /// </summary>
        void Initialize();

        /// <summary>
        /// 获取或创建
        /// </summary>
        /// <param name="settings"></param>
        /// <returns></returns>
        EngineContext GetOrCreateContext(EngineSettings settings);

        /// <summary>
        /// 更新
        /// </summary>
        /// <param name="settings"></param>
        void UpdateSettings(EngineSettings settings);

        /// <summary>
        /// 重新加载
        /// </summary>
        /// <param name="settings"></param>
        void ReloadContext(EngineSettings settings);

        /// <summary>
        /// 异步创建
        /// </summary>
        /// <param name="settings"></param>
        /// <returns></returns>
        Task<EngineContext> CreateContextAsync(EngineSettings settings);

        /// <summary>
        /// 获取已创建 Context
        /// </summary>
        /// <returns></returns>
        IEnumerable<EngineContext> GetContexts();
    }
}
