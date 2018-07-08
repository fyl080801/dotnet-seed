using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Seed.Data.Extensions;
using Seed.Environment.BackgroundTasks;
using Seed.Environment.Caching.Extensions;
using Seed.Environment.Engine.Data;
using Seed.Environment.Engine.Extensions;
using Seed.Modules.Builder;
using Seed.Modules.Extensions;
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
                .AddSetupFeatures("SeedModules.Setup")
                .WithFeatures("SeedModules.Mvc", "SeedModules.AngularUI", "SeedModules.Settings", "SeedModules.Security", "SeedModules.Project")
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
