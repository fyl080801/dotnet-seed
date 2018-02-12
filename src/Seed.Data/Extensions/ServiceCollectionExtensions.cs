using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.Extensions.DependencyInjection;
using Seed.Data.Migrations;
using Seed.Environment.Engine;
using Seed.Modules;
using System;

namespace Seed.Data.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddDataAccess(this IServiceCollection services)
        {
            services.AddScoped<IDataMigrationManager, DataMigrationManager>();
            services.AddScoped<IModuleTenantEvents, AutoDataMigration>();

            services.TryAddDataProvider(name: "Microsoft SQLServer", provider: "SqlConnection");
            services.TryAddDataProvider(name: "MySql Database", provider: "MySql");

            services.AddSingleton<IStore>(sp =>
            {
                var engineSettings = sp.GetService<EngineSettings>();

                if (engineSettings.DatabaseProvider == null)
                {
                    return null;
                }

                var optionBuilder = new DbContextOptionsBuilder();

                switch (engineSettings.DatabaseProvider)
                {
                    case "SqlConnection":
                        optionBuilder.UseSqlServer(engineSettings.ConnectionString, builder =>
                        {
                            builder.UseRowNumberForPaging(true);
                        });
                        break;
                    case "MySql":
                        optionBuilder.UseMySQL(engineSettings.ConnectionString);
                        break;
                    default:
                        throw new ArgumentException("未知数据访问提供程序: " + engineSettings.DatabaseProvider);
                }

                optionBuilder.UseApplicationServiceProvider(sp);

                return new Store(optionBuilder, sp);
            });

            services.AddScoped(sp =>
            {
                return sp.GetService<IStore>()?.CreateDbContext();
            });

            return services;
        }
    }
}
