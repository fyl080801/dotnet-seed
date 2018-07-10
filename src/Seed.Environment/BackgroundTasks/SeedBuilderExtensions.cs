using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Seed.Modules;
using Seed.Modules.Builder;

namespace Seed.Environment.BackgroundTasks
{
    public static class SeedBuilderExtensions
    {
        public static SeedBuilder AddBackgroundTasks(this SeedBuilder builder)
        {
            builder.ConfigureServices(services =>
            {
                services.TryAddSingleton<IBackgroundTaskService, BackgroundTaskService>();
                services.AddScoped<BackgroundTasksStarter>();
                services.AddScoped<IModuleTenantEvents>(sp => sp.GetRequiredService<BackgroundTasksStarter>());
            });

            return builder;
        }
    }
}
