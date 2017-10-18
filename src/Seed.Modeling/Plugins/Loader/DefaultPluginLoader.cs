using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;

namespace Seed.Plugins.Loader
{
    public class DefaultPluginLoader : IPluginLoader
    {
        readonly ILogger<DefaultPluginLoader> _logger;

        public int Order => 99;

        public DefaultPluginLoader(ILogger<DefaultPluginLoader> logger)
        {
            _logger = logger;
        }

        public PluginEntry Load(IPluginInfo pluginInfo)
        {
            try
            {
                var assembly = Assembly.Load(new AssemblyName(pluginInfo.Id));

                if (assembly == null)
                {
                    return null;
                }

                return new PluginEntry
                {
                    PluginInfo = pluginInfo,
                    Assembly = assembly,
                    Exports = assembly.ExportedTypes
                };
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