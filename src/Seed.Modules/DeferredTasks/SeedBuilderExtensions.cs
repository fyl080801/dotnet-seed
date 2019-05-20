using Microsoft.Extensions.DependencyInjection.Extensions;
using Seed.Modules.Builder;
using Seed.Modules.DeferredTasks;

namespace Microsoft.Extensions.DependencyInjection
{
    public static partial class OrchardCoreBuilderExtensions
    {
        public static SeedBuilder AddDeferredTasks(this SeedBuilder builder)
        {
            builder.ConfigureServices(services =>
            {
                services.TryAddScoped<IDeferredTaskEngine, DeferredTaskEngine>();
                services.TryAddScoped<IDeferredTaskState, HttpContextTaskState>();
            });

            return builder;
        }
    }
}