using Microsoft.Extensions.DependencyInjection;
using Seed.Environment.Plugin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Seed.Environment.Plugin.Extensions
{
    public static class PluginServiceExtensions
    {
        public static IServiceCollection AddPlugins(this IServiceCollection services)
        {
            services.AddSingleton<IPluginDescriptorStore, FolderPluginDescriptorStore>();
            services.AddSingleton<IPluginFinder, DefaultPluginFinder>();
            services.AddSingleton<IPluginManager, DefaultPluginManager>();
            return services;
        }

        public static IServiceCollection AddPluginLocation(this IServiceCollection services, string path)
        {
            return services.Configure<PluginSettings>(setting =>
            {
                setting.Path = path;
            });
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
