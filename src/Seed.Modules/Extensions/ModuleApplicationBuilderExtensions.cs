using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Seed.Plugin.Abstractions;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace Seed.Modules.Extensions
{
    public static class ModuleApplicationBuilderExtensions
    {
        public static IApplicationBuilder UseModules(this IApplicationBuilder app)
        {
            //app.Run(async (context) =>
            //{
            //    await context.Response.WriteAsync("Hello World!");
            //});

            app.UseMiddleware<ModuleLauncherContainerMiddleware>();
            //app.UseMiddleware<ModuleLauncherRouterMiddleware>();

            return app;
        }

        public static IApplicationBuilder UseModules(this IApplicationBuilder app, Action<ModuleApplicationBuilder> modules)
        {
            app.UseModules();

            app.ConfigureModules(modules);

            return app;
        }

        public static IApplicationBuilder ConfigureModules(this IApplicationBuilder app, Action<ModuleApplicationBuilder> modules)
        {
            var modularApplicationBuilder = new ModuleApplicationBuilder(app);
            modules(modularApplicationBuilder);

            return app;
        }

        //public static ModuleApplicationBuilder UseStaticFilesModules(this ModuleApplicationBuilder modularApp)
        //{
        //    modularApp.Configure(app =>
        //    {
        //        var pluginManager = app.ApplicationServices.GetRequiredService<IPluginManager>();
        //        var env = app.ApplicationServices.GetRequiredService<IHostingEnvironment>();

        //        var availablePlugins = pluginManager.GetExtensions();
        //        foreach (var extension in availablePlugins)
        //        {
        //            var contentPath = Path.Combine(extension.ExtensionFileInfo.PhysicalPath, "Content");
        //            var contentSubPath = Path.Combine(extension.SubPath, "Content");

        //            if (Directory.Exists(contentPath))
        //            {
        //                IFileProvider fileProvider;
        //                if (env.IsDevelopment())
        //                {
        //                    fileProvider = new CompositeFileProvider(
        //                        new ModuleProjectContentFileProvider(env.ContentRootPath, contentSubPath),
        //                        new PhysicalFileProvider(contentPath));
        //                }
        //                else
        //                {
        //                    fileProvider = new PhysicalFileProvider(contentPath);
        //                }

        //                app.UseStaticFiles(new StaticFileOptions
        //                {
        //                    RequestPath = "/" + extension.Id,
        //                    FileProvider = fileProvider
        //                });
        //            }
        //        }
        //    });

        //    return modularApp;
        //}
    }
}
