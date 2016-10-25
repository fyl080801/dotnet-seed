using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Seed.Extensions.Plugin.Builder
{
    /// <summary>
    /// 解析 plugin 定义的基类
    /// </summary>
    public abstract class BaseDescriptorBuilder :
        IDescriptorBuilder
    {
        public abstract PluginDescriptor Build();
    }
}
