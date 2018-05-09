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
        readonly EngineSettings _settings;
        readonly IServiceProvider _serviceProvider;

        public Store(
            DbContextOptionsBuilder dbContextOptionsBuilder,
            IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
            _dbContextOptionsBuilder = dbContextOptionsBuilder;
            _settings = serviceProvider.GetService<EngineSettings>();
        }

        public IDbContext CreateDbContext(params object[] typeConfigs)
        {
            return new ModuleDbContext(_dbContextOptionsBuilder.Options, _settings, typeConfigs);
        }

        public Task InitializeAsync(IServiceProvider service)
        {
            CreateDbContext().Context.Database.Migrate();
            return service.GetService<IDataMigrationManager>().UpdateAllFeaturesAsync();
        }
    }
}