using Microsoft.Extensions.DependencyInjection.Extensions;
using SeedCore.DeferredTasks;

namespace Microsoft.Extensions.DependencyInjection
{
    public static partial class SeedCoreBuilderExtensions
    {
        /// <summary>
        /// Adds tenant level deferred tasks services.
        /// </summary>
        public static SeedCoreBuilder AddDeferredTasks(this SeedCoreBuilder builder)
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
