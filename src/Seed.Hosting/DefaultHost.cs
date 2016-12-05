using Microsoft.Extensions.Logging;
using Seed.Extensions.Plugin;
using System;

namespace Seed.Hosting
{
    public class DefaultHost : IHost
    {
        readonly IPluginManager _pluginManager;
        readonly ILogger _logger;

        public DefaultHost(
            IPluginManager pluginManager,
            ILogger<DefaultHost> logger)
        {
            _pluginManager = pluginManager;
            _logger = logger;
        }

        public void Initialize()
        {
            _pluginManager.GetPluginDescriptors();
        }
    }
}