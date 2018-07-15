using Microsoft.Extensions.DependencyInjection;
using Seed.Data.Extensions;
using Seed.Environment.BackgroundTasks;
using Seed.Environment.Caching.Extensions;
using Seed.Environment.Engine.Data;
using Seed.Modules.Builder;
using Seed.Modules.Extensions;
using Seed.Mvc.Extensions;
using System;

namespace Seed.Application.All.Targets
{
    public static class ServiceExtensions
    {
        public static IServiceCollection AddSeedApplication(this IServiceCollection services)
        {
            return AddSeedApplication(services, null);
        }

        public static IServiceCollection AddSeedApplication(this IServiceCollection services, Action<SeedBuilder> configure)
        {
            var builder = services.AddSeed()
                .AddMvc()
                .AddSetupFeatures("SeedModules.Setup")
                .WithFeatures("SeedModules.AngularUI", "SeedModules.Project")
                .AddDataAccess()
                .AddEngineStorage()
                .AddBackgroundTasks()
                .AddDeferredTasks()
                .AddCaching();

            configure?.Invoke(builder);

            return services;
        }
    }
}
