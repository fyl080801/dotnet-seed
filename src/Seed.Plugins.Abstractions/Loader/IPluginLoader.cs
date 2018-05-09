using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Seed.Plugins.Loader
{
    /// <summary>
    /// 读模块
    /// </summary>
    public interface IPluginLoader
    {
        /// <summary>
        /// 执行顺序
        /// </summary>
        int Order { get; }

        /// <summary>
        /// 读
        /// </summary>
        /// <param name="pluginInfo">模块信息</param>
        /// <returns>模块入口定义</returns>
        PluginEntry Load(IPluginInfo pluginInfo);
    }
}