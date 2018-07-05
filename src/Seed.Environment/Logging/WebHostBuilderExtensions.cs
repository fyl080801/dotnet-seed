using Microsoft.AspNetCore.Hosting;
using NLog;
using NLog.LayoutRenderers;
using NLog.Web;
using System.IO;

namespace Seed.Environment.Logging
{
    public static class WebHostBuilderExtensions
    {
        public static IWebHostBuilder UseNLogWeb(this IWebHostBuilder builder)
        {
            LayoutRenderer.Register<TenantLayoutRenderer>(TenantLayoutRenderer.LayoutRendererName);
            builder.UseNLog();
            builder.ConfigureAppConfiguration((context, configuration) =>
            {
                var environment = context.HostingEnvironment;
                var configPath = $"{environment.ContentRootPath}{Path.DirectorySeparatorChar}NLog.config";

                if (File.Exists(configPath))
                {
                    environment.ConfigureNLog(configPath);
                    LogManager.Configuration.Variables["configDir"] = environment.ContentRootPath;
                }
            });

            return builder;
        }
    }
}
