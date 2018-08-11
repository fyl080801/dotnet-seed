using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.Extensions.DependencyInjection;
using Pomelo.EntityFrameworkCore.MySql.Infrastructure;
using Seed.Data.Migrations;
using Seed.Environment.Engine;
using System;
using System.Threading.Tasks;

namespace Seed.Data
{
    public class Store : IStore
    {
        readonly EngineSettings _settings;
        readonly IServiceProvider _serviceProvider;

        DbContextOptionsBuilder _cachedOptionsBuilder;

        public Store(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
            _settings = serviceProvider.GetService<EngineSettings>();
        }

        public IDbContext CreateDbContext(params object[] typeConfigs)
        {
            return new ModuleDbContext(CreateOptions(true), _settings, typeConfigs);
        }

        public DbContextOptions CreateOptions(bool cached = false)
        {
            if (cached && _cachedOptionsBuilder != null)
            {
                return _cachedOptionsBuilder.Options;
            }

            var optionBuilder = new DbContextOptionsBuilder();

            if (_settings.DatabaseProvider == null)
            {
                return null;
            }

            switch (_settings.DatabaseProvider)
            {
                case "SqlConnection":
                    optionBuilder.UseSqlServer(_settings.ConnectionString, ob =>
                    {
                        ob.UseRowNumberForPaging(true);
                    });
                    break;
                case "MySql":
                    optionBuilder.UseMySql(_settings.ConnectionString, ob =>
                    {
                        ob.CharSetBehavior(CharSetBehavior.AppendToAllColumns);
                        ob.UnicodeCharSet(CharSet.Utf8mb4);
                    });
                    break;
                default:
                    throw new ArgumentException("未知数据访问提供程序: " + _settings.DatabaseProvider);
            }

            optionBuilder.UseApplicationServiceProvider(_serviceProvider);

            if (_cachedOptionsBuilder == null)
            {
                _cachedOptionsBuilder = optionBuilder;
            }

            return optionBuilder.Options;
        }

        public async Task InitializeAsync(IServiceProvider service)
        {
            await CreateDbContext().Context.Database.MigrateAsync();
            await service.GetService<IDataMigrationManager>().UpdateAllFeaturesAsync();
        }
    }
}