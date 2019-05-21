using Microsoft.Extensions.DependencyInjection;
using SeedCore.Modules;

namespace Microsoft.AspNetCore.Builder
{
    public static class PoweredBySeedCoreExtensions
    {
        public static IApplicationBuilder UsePoweredBySeedCore(this IApplicationBuilder app, bool enabled)
        {
            var options = app.ApplicationServices.GetRequiredService<IPoweredByMiddlewareOptions>();
            options.Enabled = enabled;

            return app;
        }

        public static IApplicationBuilder UsePoweredBy(this IApplicationBuilder app, bool enabled, string headerValue)
        {
            var options = app.ApplicationServices.GetRequiredService<IPoweredByMiddlewareOptions>();
            options.Enabled = enabled;
            options.HeaderValue = headerValue;

            return app;
        }
    }
}