using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Newtonsoft.Json.Linq;
using Seed.Extensions.Plugin.Builder;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Seed.Extensions.Plugin
{
    /// <summary>
    /// 
    /// </summary>
    /// <remarks>
    /// 这个实现只负责构建和查找 plugin 描述定义
    /// </remarks>
    public class DefaultPluginFinder : IPluginFinder
    {
        readonly IPluginDescriptorStore _descriptorStore;
        readonly IHostingEnvironment _hostingEnvironment;
        readonly IEnumerable<string> _installedIds;

        public DefaultPluginFinder(
            IPluginDescriptorStore descriptorStore,
            IHostingEnvironment hostingEnvironment)
        {
            _descriptorStore = descriptorStore;
            _hostingEnvironment = hostingEnvironment;
            _installedIds = GetInstalled();
        }

        public IEnumerable<PluginDescriptor> GetDescriptors()
        {
            return _descriptorStore.LoadContexts()
                .Select(context => new InstancesBuilder(            //获取实例
                    new InstalledBuilder(                           //判断是否已安装
                        new JsonDescriptorBuilder(context.Content),
                        _installedIds.ToArray()),
                    context.Path).Build())                          //使用json格式解析
                .ToList();
        }

        public IEnumerable<string> GetInstalled()
        {
            var path = _hostingEnvironment.ContentRootPath + "/plugins.txt";
            if (!File.Exists(path))
                File.Create(path);
            var installed = new List<string>();
            using (var reader = File.OpenText(path))
            {
                while (!reader.EndOfStream)
                {
                    installed.Add(reader.ReadLine());
                }
            }
            return installed;
        }

        public PluginDescriptor GetPluginDescriptorById(string pluginId)
        {
            return this.GetDescriptors().Single(e => e.Id == pluginId);
        }
    }
}
