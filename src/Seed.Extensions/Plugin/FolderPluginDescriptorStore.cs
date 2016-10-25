using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Seed.Extensions.Plugin
{
    /// <summary>
    /// 通过文件夹中定义的 plugin.json 文件识别 plugin
    /// </summary>
    public class FolderPluginDescriptorStore : IPluginDescriptorStore
    {
        readonly IHostingEnvironment _hostingEnvironment;
        readonly IOptions<PluginSettings> _pluginOptions;
        readonly string _pluginRootPath;

        public FolderPluginDescriptorStore(
            IHostingEnvironment hostingEnvironment,
            IOptions<PluginSettings> pluginOptions)
        {
            _hostingEnvironment = hostingEnvironment;
            _pluginOptions = pluginOptions;
            _pluginRootPath = _hostingEnvironment.ContentRootPath + _pluginOptions.Value.Path;
        }

        public IEnumerable<PluginLoadContext> LoadContexts()
        {
            return GetPluginFullPaths()
                .Select(filePath => new PluginLoadContext()
                {
                    Content = ReadFileText(filePath),
                    Path = filePath
                })
                .ToList();
        }

        private IEnumerable<string> GetPluginFullPaths()
        {
            return Directory.GetFiles(_pluginRootPath, "plugin.json", SearchOption.AllDirectories);
        }

        private string ReadFileText(string filePath)
        {
            using (var reader = File.OpenText(filePath))
            {
                return reader.ReadToEnd();
            }
        }
    }
}
