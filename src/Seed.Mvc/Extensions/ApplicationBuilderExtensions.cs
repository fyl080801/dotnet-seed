using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.ApplicationParts;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Seed.Environment.Plugin;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Seed.Mvc.Extensions
{
    public static class ApplicationBuilderExtensions
    {
        public static IApplicationBuilder UseExtensions(this IApplicationBuilder builder)
        {
            var pluginManager = builder.ApplicationServices.GetRequiredService<IPluginManager>();
            var hostingEnvironment = builder.ApplicationServices.GetRequiredService<IHostingEnvironment>();
            var loggerFactory = builder.ApplicationServices.GetRequiredService<ILoggerFactory>();
            var logger = loggerFactory.CreateLogger("Default");

            if (hostingEnvironment.IsDevelopment())
            {
                builder.UseDeveloperExceptionPage();
            }

            builder.UseStaticFiles();

            var availablePlugins = pluginManager.GetPluginDescriptors();
            //foreach (var plugin in availablePlugins)
            //{
            //    //var contentPath = Path.Combine(extension.ExtensionFileInfo.PhysicalPath, "Content");
            //    //if (Directory.Exists(contentPath))
            //    //{
            //    //    builder.UseStaticFiles(new StaticFileOptions
            //    //    {
            //    //        RequestPath = "/" + extension.Id,
            //    //        FileProvider = new PhysicalFileProvider(contentPath)
            //    //    });
            //    //}
            //}

            builder.UseMiddleware<SeedContainerMiddleware>();

            builder.UseMiddleware<SeedRouterMiddleware>();

            var applicationPartManager = builder.ApplicationServices.GetRequiredService<ApplicationPartManager>();
            using (logger.BeginScope("Loading plugins"))
            {
                Parallel.ForEach(availablePlugins, descriptor =>
                {
                    try
                    {
                        descriptor.AvailableAssemblies
                            .Select(e => new AssemblyPart(e))
                            .ToList()
                            .ForEach(part =>
                            {
                                if (!applicationPartManager.ApplicationParts.Contains(part))
                                {
                                    applicationPartManager.ApplicationParts.Add(part);
                                }
                            });
                    }
                    catch (Exception ex)
                    {
                        logger.LogCritical("Could not load an plugin", descriptor, ex);
                    }
                });
            }

            return builder;
        }
    }
}
