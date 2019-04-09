using System;
using System.Reflection;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;

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
            var callerName = Assembly.GetCallingAssembly().GetName().Name;
            options = options ?? new SeedSpaOptions { SpaType = SpaTypes.React };

            app.UseSpa(config =>
            {
                config.Options.DefaultPage = $"/{callerName}";

                if (env.IsDevelopment())
                {
                    config.Options.SourcePath = $"../../modules/{callerName}/ClientApp";

                    if (options.SpaType == SpaTypes.React)
                    {
                        config.UseReactDevelopmentServer("start");
                    }
                }
            });
            return app;
        }
    }
}
