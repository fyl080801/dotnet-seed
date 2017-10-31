using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.Extensions.DependencyInjection;
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
            services.AddScoped<IModuleLauncherEvents, AutoDataMigration>();

            services.TryAddDataProvider(name: "Microsoft SQLServer", provider: "SqlConnection");
            services.TryAddDataProvider(name: "MySql Database", provider: "MySql");

            //services.AddSingleton(typeof(IEntityTypeConfiguration<>));

            services.AddSingleton<IStore>(sp =>
            {
                var engineSettings = sp.GetService<EngineSettings>();
                var hostingEnvironment = sp.GetService<IHostingEnvironment>();

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

                return new Store(optionBuilder);
            });

            services.AddScoped(sp =>
            {
                return sp.GetService<IStore>()?.CreateDbContext();
            });

            return services;
        }
    }
}
