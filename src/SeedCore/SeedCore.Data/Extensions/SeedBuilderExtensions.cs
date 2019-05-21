﻿using System.Linq;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.Extensions.DependencyInjection;
using SeedCore.Data;
using SeedCore.Data.Extensions;
using SeedCore.Data.Migrations;
using SeedCore.Modules;

namespace Microsoft.Extensions.DependencyInjection
{
    public static class SeedBuilderExtensions
    {
        public static SeedCoreBuilder AddDataAccess(this SeedCoreBuilder builder)
        {
            builder.ConfigureServices(services =>
            {
                services.AddScoped<IDataMigrationManager, DataMigrationManager>();
                services.AddScoped<IModularTenantEvents, AutoDataMigration>();
                services.AddScoped<IDataMigrator, DataMigrator>();

                services.TryAddDataProvider(name: "Microsoft SQLServer", provider: "SqlConnection");
                services.TryAddDataProvider(name: "MySql Database", provider: "MySql");

                services.AddSingleton<IStore>(sp =>
                {
                    return new Store(sp);
                });

                services.AddScoped<IDbContext>(sp =>
                {
                    var typeConfigs = sp.GetServices<IEntityTypeConfigurationProvider>()
                        .InvokeAsync(provider => provider.GetEntityTypeConfigurationsAsync(), null)
                        .Result;
                    return sp.GetService<IStore>()?.CreateDbContext(typeConfigs.ToArray());
                });
            });

            return builder;
        }
    }
}
