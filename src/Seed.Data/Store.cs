using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Seed.Data.Migrations;
using Seed.Environment.Engine;
using Seed.Environment.Engine.Descriptors;
using Seed.Plugins;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Seed.Data
{
    public class Store : IStore
    {
        readonly DbContextOptionsBuilder _dbContextOptionsBuilder;
        readonly IPluginManager _pluginManager;
        readonly EngineSettings _settings;
        readonly IServiceProvider _serviceProvider;

        IEnumerable<object> _entityConfigurations = Enumerable.Empty<object>();

        public Store(
            //DbContextOptionsBuilder dbContextOptionsBuilder,
            IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
            _dbContextOptionsBuilder = CreateOptionBuilder();//dbContextOptionsBuilder;
            _pluginManager = serviceProvider.GetService<IPluginManager>();
            _settings = serviceProvider.GetService<EngineSettings>();

            var engineDescriptor = serviceProvider.GetService<EngineDescriptor>();

            _entityConfigurations = GetFeatureTypeConfigurations(engineDescriptor.Features.Select(e => e.Id).ToArray());
        }

        public IDbContext CreateDbContext()
        {
            return new ModuleDbContext(_dbContextOptionsBuilder.Options, _settings, _entityConfigurations.ToArray());
        }

        public IDbContext CreateDbContext(IEnumerable<string> features)
        {
            return new ModuleDbContext(CreateOptionBuilder().Options, _settings, GetFeatureTypeConfigurations(features));
        }

        public Task InitializeAsync(IServiceProvider service)
        {
            CreateDbContext().Context.Database.Migrate();
            return service.GetService<IDataMigrationManager>().UpdateAllFeaturesAsync();
        }

        private DbContextOptionsBuilder CreateOptionBuilder()
        {
            var engineSettings = _serviceProvider.GetService<EngineSettings>();

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
            return optionBuilder;
        }

        private IEnumerable<object> GetFeatureTypeConfigurations(IEnumerable<string> features)
        {
            var configurations = new List<object>();
            var configurationType = typeof(IEntityTypeConfiguration<>);
            _pluginManager.GetFeatures(features.ToArray())
                .ToDictionary(x => x.Id, y => y.Plugin)
                .Values.Distinct()
                .ToDictionary(
                    x => x.Id,
                    y =>
                    {
                        var exports = _pluginManager.GetPluginEntryAsync(y).Result.Exports;
                        return exports
                            .Where(e =>
                            {
                                var typeInterfaces = e.GetInterfaces();
                                foreach (var inter in typeInterfaces)
                                {
                                    if (inter.IsGenericType && inter.GetGenericTypeDefinition() == configurationType)
                                        return true;
                                }
                                return false;
                            })
                            .Select(e => ActivatorUtilities.GetServiceOrCreateInstance(_serviceProvider, e))
                            .ToList();
                    }
                )
                .Values.ToList()
                .ForEach(list =>
                {
                    configurations = configurations.Concat(list).ToList();
                });

            return configurations;
        }
    }
}