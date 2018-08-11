using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.Extensions.DependencyInjection;
using Seed.Data.Migrations;
using Seed.Environment.Engine;
using System;
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

        public DbContextOptions CreateOptions()
        {
            return _dbContextOptionsBuilder.Options;
        }

        public async Task InitializeAsync(IServiceProvider service)
        {
            await CreateDbContext().Context.Database.MigrateAsync();
            await service.GetService<IDataMigrationManager>().UpdateAllFeaturesAsync();
        }
    }
}