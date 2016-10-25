using Microsoft.AspNetCore.Hosting;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Seed.Extensions.Plugin.Builder
{
    /// <summary>
    /// 解析当前 plugin 是否被安装
    /// </summary>
    public class InstalledBuilder : BaseDescriptorAssembleBuilder, IDescriptorBuilder
    {
        string[] _installedPlugins;

        public InstalledBuilder(
            IDescriptorBuilder builder,
            string[] installedPlugins)
            : base(builder)
        {
            _installedPlugins = installedPlugins;
        }

        public override PluginDescriptor Build()
        {
            var descriptor = base.Build();

            descriptor.Installed = _installedPlugins.Count(e => e == descriptor.Id) > 0;

            return descriptor;
        }
    }
}
