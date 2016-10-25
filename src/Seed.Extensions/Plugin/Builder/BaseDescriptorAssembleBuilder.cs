﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Seed.Extensions.Plugin.Builder
{
    /// <summary>
    /// 组装完整的 plugin 描述定义
    /// </summary>
    /// <remarks>
    /// 负责处理除了 plugin 定义文件中定义的以外的 plugin 属性定义初始化
    /// </remarks>
    public abstract class BaseDescriptorAssembleBuilder : IDescriptorBuilder
    {
        IDescriptorBuilder _builder;

        public BaseDescriptorAssembleBuilder(IDescriptorBuilder builder)
        {
            _builder = builder;
        }

        public virtual PluginDescriptor Build()
        {
            return _builder.Build();
        }
    }
}