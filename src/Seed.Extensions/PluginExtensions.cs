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

            #region nouse
            //var config = new ConfigurationBuilder()
            //    .Add(new JsonConfigurationSource() { Path = "pluginSettings.json", ReloadOnChange = true })
            //    .Build();

            //services = services.AddOptions()
            //    .Configure<PluginSettings>(options =>
            //    {
            //        options.Path = config.GetValue<string>("Path");
            //        options.Installed = config.GetSection("Installed")..GetValue<string[]>("Installed");
            //    });
            #endregion
        }
    }
}
