using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Seed.Extensions.Plugin
{
    /// <summary>
    /// 识别 plugin 的方法
    /// </summary>
    public interface IPluginDescriptorStore
    {
        IEnumerable<PluginLoadContext> LoadContexts();
    }
}
