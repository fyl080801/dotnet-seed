using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

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
                setting.Path = path.Replace('/', '\\');
            });
        }

        public static IServiceCollection AddPluginLocation(this IServiceCollection services, IConfiguration configuration)
        {
            return services.Configure<PluginSettings>(configuration.GetSection("pluginSettings"));
        }
    }
}
