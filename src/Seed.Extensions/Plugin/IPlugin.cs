using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Seed.Extensions.Plugin
{
    /// <summary>
    /// 处理 plugin 在部署时或移除时执行的逻辑
    /// </summary>
    /// <remarks>
    /// 一个 plugin 中可以包含多个 IPlugin
    /// </remarks>
    public interface IPlugin
    {
        void Install();

        void Uninstall();
    }
}
