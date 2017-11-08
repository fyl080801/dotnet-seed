using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Text;

namespace Seed.Environment.Engine
{
    /// <summary>
    /// Engine 设置的存取方法
    /// </summary>
    public interface IEngineSettingsConfigurationProvider
    {
        /// <summary>
        /// 排序
        /// </summary>
        int Order { get; }

        /// <summary>
        /// 将配置源添加到 builder 中
        /// </summary>
        /// <param name="builder"></param>
        /// <remarks>通过实现数据库或配置文件将配置内容加到 builder</remarks>
        void AddSource(IConfigurationBuilder builder);

        /// <summary>
        /// 降配置进行保存
        /// </summary>
        /// <param name="name"></param>
        /// <param name="configuration"></param>
        void SaveToSource(string name, IDictionary<string, string> configuration);
    }
}
