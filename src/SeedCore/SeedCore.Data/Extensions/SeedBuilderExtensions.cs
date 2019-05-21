using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.Extensions.DependencyInjection;
using Pomelo.EntityFrameworkCore.MySql.Infrastructure;
using Seed.Data.Migrations;
using Seed.Environment.Engine;
using Seed.Modules;
using Seed.Modules.Builder;
using Seed.Modules.Exceptions;
using System;
using System.Linq;

namespace Seed.Data.Extensions
{
    public static class SeedBuilderExtensions
    {
        public static SeedBuilder AddDataAccess(this SeedBuilder builder)
        {
            builder.ConfigureServices(services =>
            {
                services.AddScoped<IDataMigrationManager, DataMigrationManager>();
                services.AddScoped<IModuleTenantEvents, AutoDataMigration>();
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
