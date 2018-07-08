using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using System;

namespace Seed.Modules.Extensions
{
    public static class ApplicationBuilderExtensions
    {
        public static IApplicationBuilder UseSeedApplication(this IApplicationBuilder app, Action<IApplicationBuilder> configure = null)
        {
            var env = app.ApplicationServices.GetRequiredService<IHostingEnvironment>();

            env.ContentRootFileProvider = new CompositeFileProvider(
                new ModuleEmbeddedFileProvider(env),
                env.ContentRootFileProvider);

            app.UseMiddleware<ModuleTenantContainerMiddleware>();

            configure?.Invoke(app);

            app.UseMiddleware<ModuleTenantRouterMiddleware>();

            return app;
        }

        //public static IApplicationBuilder UseModules(this IApplicationBuilder app, Action<ModuleApplicationBuilder> modules)
        //{
        //    app.UseSeed();

        //    app.ConfigureModules(modules);

        //    return app;
        //}

        //public static IApplicationBuilder ConfigureModules(this IApplicationBuilder app, Action<ModuleApplicationBuilder> modules)
        //{
        //    modules(new ModuleApplicationBuilder(app));

        //    return app;
        //}

        //public static ModuleApplicationBuilder UseStaticFilesModules(this ModuleApplicationBuilder modularApp)
        //{
        //    modularApp.Configure(app =>
        //    {
        //        var pluginManager = app.ApplicationServices.GetRequiredService<IPluginManager>();
        //        var env = app.ApplicationServices.GetRequiredService<IHostingEnvironment>();

        //        // 为了实现 "/<模块名>/<文件>" 到实际文件路径的映射
        //        pluginManager.GetPlugins().ToList().ForEach(plugin =>
        //        {
        //            var contentPath = Path.Combine(plugin.PluginFileInfo.PhysicalPath, "Content");
        //            var contentSubPath = Path.Combine(plugin.Path, "Content");

        //            if (Directory.Exists(contentPath))
        //            {
        //                IFileProvider fileProvider;
        //                if (env.IsDevelopment())
        //                {
        //                    // 在开发环境中生成的文件在入口项目中
        //                    fileProvider = new CompositeFileProvider(
        //                        new ModuleProjectContentFileProvider(env.ContentRootPath, contentSubPath),
        //                        new PhysicalFileProvider(contentPath)
        //                    );
        //                }
        //                else
        //                {
        //                    fileProvider = new PhysicalFileProvider(contentPath);
        //                }

        //                // 当请求是以 "/模块Id" 开头时映射到真实文件路径
        //                app.UseStaticFiles(new StaticFileOptions
        //                {
        //                    RequestPath = "/" + plugin.Id,
        //                    FileProvider = fileProvider
        //                });
        //            }
        //        });
        //    });

        //    return modularApp;
        //}

        //public static IApplicationBuilder UseDeferredTasks(this IApplicationBuilder app)
        //{
        //    app.UseMiddleware<DeferredTaskMiddleware>();

        //    return app;
        //}
    }
}
