using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Configuration.Json;
using Microsoft.Extensions.DependencyInjection;
using Seed.Extensions.Plugin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Seed.Extensions
{
    public static class PluginExtensions
    {
        public static void AddPlugins(this IServiceCollection services, IConfiguration config)
        {
            services.AddSingleton<IPluginDescriptorStore, FolderPluginDescriptorStore>();
            services.AddSingleton<IPluginFinder, DefaultPluginFinder>();
            services.AddSingleton<IPluginManager, DefaultPluginManager>();
            services.Configure<PluginSettings>(config.GetSection("pluginSettings"));
        }

        // 使用plugin中间件处理plugin中的中间件行为
        //public static void UsePlugins(this IApplicationBuilder app)
        //{
        //    app.ApplicationServices
        //        .GetService<IPluginManager>()
        //        .GetPluginDescriptors()
        //        .ToList()
        //        .ForEach(plugin => plugin.Context
        //            .GetStartups()
        //            .ToList()
        //            .ForEach(start =>
        //            {

        //            })
        //        );
        //}
    }
}
