using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Conventions;
using Seed.Plugins;
using Microsoft.Extensions.DependencyInjection;
using Seed.Environment.Engine;

namespace Seed.Data
{
    public class Store : IStore
    {
        readonly DbContextOptionsBuilder _dbContextOptionsBuilder;
        readonly IEngineFeaturesManager _engineFeaturesManager;
        readonly IPluginManager _pluginManager;

        IEnumerable<object> _entityConfigurations = Enumerable.Empty<object>();

        public Store(DbContextOptionsBuilder dbContextOptionsBuilder, IServiceProvider serviceProvider)
        {
            _dbContextOptionsBuilder = dbContextOptionsBuilder;
            _engineFeaturesManager = serviceProvider.GetService<IEngineFeaturesManager>();
            _pluginManager = serviceProvider.GetService<IPluginManager>();

            _engineFeaturesManager.GetEnabledFeaturesAsync().Result
                .ToDictionary(
                    x => x.Id,
                    y => y.Plugin
                )
                .Values.Distinct()
                .ToDictionary(
                    x => x.Id,
                    y => _pluginManager.GetPluginEntryAsync(y).Result.Exports
                       .Where(e => e.IsGenericType && e.GetGenericTypeDefinition() == typeof(IEntityTypeConfiguration<>))
                       .Select(e => ActivatorUtilities.GetServiceOrCreateInstance(serviceProvider, e))
                       .ToList()
                )
                .Values.ToList()
                .ForEach(list =>
                {
                    _entityConfigurations = _entityConfigurations.Concat(list);
                });

        }

        public DbContext CreateDbContext()
        {
            return new ModuleDbContext(_dbContextOptionsBuilder.Options, _entityConfigurations.ToArray());
        }

        public Task InitializeAsync()
        {
            return new ModuleDbContext(_dbContextOptionsBuilder.Options, _entityConfigurations.ToArray()).Database.MigrateAsync();
        }
    }
}
