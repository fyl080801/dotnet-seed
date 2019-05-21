﻿using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.Extensions.DependencyInjection;
using Pomelo.EntityFrameworkCore.MySql.Infrastructure;
using SeedCore.Data.Migrations;
using SeedCore.Shell;

namespace SeedCore.Data
{
    public class Store : IStore
    {
        readonly ShellSettings _settings;
        readonly IServiceProvider _serviceProvider;

        DbContextOptionsBuilder _cachedOptionsBuilder;

        public Store(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
            _settings = serviceProvider.GetService<ShellSettings>();
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