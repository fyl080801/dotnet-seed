using Microsoft.Extensions.Logging;
using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using System.Collections.Concurrent;

namespace Seed.Plugins.Loader
{
    public class PathPluginLoader : IPluginLoader
    {
        readonly ILogger<PathPluginLoader> _logger;

        public int Order => 99;

        public PathPluginLoader(ILogger<PathPluginLoader> logger)
        {
            _logger = logger;
        }

        public PluginEntry Load(IPluginInfo pluginInfo)
        {
            try
            {
                var entry = new PluginEntry
                {
                    PluginInfo = pluginInfo
                };

                var files = Directory.GetFiles(pluginInfo.PluginFileInfo.PhysicalPath, "*.dll", SearchOption.AllDirectories).ToList();
                var concurrentQueue = new ConcurrentQueue<IEnumerable<Type>>();
                Parallel.ForEach(files, file =>
                {
                    concurrentQueue.Enqueue(Assembly.Load(File.ReadAllBytes(file)).ExportedTypes);
                });
                while (concurrentQueue.Count > 0)
                {
                    var isDequeue = concurrentQueue.TryDequeue(out IEnumerable<Type> types);
                    if (!isDequeue)
                        throw new Exception("获取 Plugin 导出类型时出错");
                    entry.Exports = entry.Exports.Concat(types);
                }
                return entry;
            }
            catch (Exception ex)
            {
                if (_logger.IsEnabled(LogLevel.Information))
                {
                    _logger.LogInformation("找到 Plugin 但无法读取: '{0}', {1}", pluginInfo.Id, ex.Message);
                }

                return null;
            }
        }
    }
}
