using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.AspNetCore.SpaServices.StaticFiles;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using System;
using System.Collections.Generic;
using System.Reflection;

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

        public static IApplicationBuilder UseSeedSpa(this IApplicationBuilder app, SeedSpaOptions options = null)
        {
            var env = app.ApplicationServices.GetService<IHostingEnvironment>();
            var currentCaller = Assembly.GetCallingAssembly().GetName().Name;
            options = options ?? new SeedSpaOptions() { SpaType = "react" };

            // app.UseSpaStaticFiles(new StaticFileOptions()
            // {
            //     RequestPath = "/SeedModules.Setup",
            //     FileProvider = new ModuleSpaStaticFileProvider(app.ApplicationServices, new SpaStaticFilesOptions()).FileProvider
            // });

            app.UseSpa(config =>
            {
                config.Options.SourcePath = $"../../modules/{currentCaller}/ClientApp";
                config.Options.DefaultPage = $"/{currentCaller}";
                if (env.IsDevelopment())
                {
                    if (options.SpaType == "react")
                    {
                        config.UseReactDevelopmentServer(npmScript: "start");
                    }
                }
            });
            return app;
        }
    }
}
