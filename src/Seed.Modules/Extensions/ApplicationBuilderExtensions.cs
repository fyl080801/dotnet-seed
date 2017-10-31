using Microsoft.AspNetCore.Builder;
using Seed.Modules.DeferredTasks;

namespace Seed.Modules.Extensions
{
    public static class ApplicationBuilderExtensions
    {
        public static IApplicationBuilder UseDeferredTasks(this IApplicationBuilder app)
        {
            app.UseMiddleware<DeferredTaskMiddleware>();

            return app;
        }
    }
}
