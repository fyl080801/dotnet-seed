using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.DependencyInjection;
using Seed.Extensions;
using Seed.Extensions.Plugin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Seed.Mvc
{
    public static class StartupExtensions
    {
        public static void Configure(this IStartup startup, IApplicationBuilder app, IServiceProvider serviceProvider, IRouteBuilder routes)
        {
            serviceProvider.GetService<IPluginManager>()
                .GetPluginDescriptors()
                .ToList()
                .ForEach(plugin =>
                {
                    //要使用PluginRunningContext获取路由信息，注册路由
                    //plugin.Context
                });
        }
    }
}
