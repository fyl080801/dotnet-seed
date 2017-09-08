using System;
using System.Collections.Generic;
using System.Text;

namespace Seed.Environment.Engine.Builder
{
    public interface IEngineContainerFactory
    {
        /// <summary>
        /// 创建 Container
        /// </summary>
        IServiceProvider CreateContainer(EngineSettings settings, EngineSchema schema);
    }
}
