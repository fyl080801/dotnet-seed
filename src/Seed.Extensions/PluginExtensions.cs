using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using Seed.Extensions.Plugin;

namespace Seed.Extensions
{
    public static class PluginExtensions
    {
        public static void AddPlugins(this IServiceCollection services, PluginSettings settings)
        {
            // 注册 PluginManager
        }
    }
}
