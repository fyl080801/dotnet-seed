using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using SeedCore.Modules;
using System;

namespace Microsoft.AspNetCore.Builder
{
    public static class ApplicationBuilderExtensions
    {
        public static IApplicationBuilder UseSeedCore(this IApplicationBuilder app, Action<IApplicationBuilder> configure = null)
        {
            var env = app.ApplicationServices.GetRequiredService<IHostingEnvironment>();
            var appContext = app.ApplicationServices.GetRequiredService<IApplicationContext>();

            env.ContentRootFileProvider = new CompositeFileProvider(
                new ModuleEmbeddedFileProvider(appContext),
                env.ContentRootFileProvider);

            app.UseMiddleware<PoweredByMiddleware>();

            app.UseMiddleware<ModularTenantContainerMiddleware>();

            configure?.Invoke(app);

            app.UseMiddleware<ModularTenantRouterMiddleware>(app.ServerFeatures);

            return app;
        }
    }
}