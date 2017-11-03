using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
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

        IEnumerable<object> _entityConfigurations = Enumerable.Empty<object>();

        public Store(DbContextOptionsBuilder dbContextOptionsBuilder, IServiceProvider serviceProvider)
        {
            _dbContextOptionsBuilder = dbContextOptionsBuilder;
            _pluginManager = serviceProvider.GetService<IPluginManager>();

            var engineDescriptor = serviceProvider.GetService<EngineDescriptor>();
            var configurationType = typeof(IEntityTypeConfiguration<>);

            _pluginManager.GetFeatures(engineDescriptor.Features.Select(e => e.Id).ToArray())
                .ToDictionary(
                    x => x.Id,
                    y => y.Plugin
                )
                .Values.Distinct()
                .ToDictionary(
                    x => x.Id,
                    y =>
                    {
                        var exports = _pluginManager.GetPluginEntryAsync(y).Result.Exports;
                        return exports.Where(e =>
                        {
                            var typeInterfaces = e.GetInterfaces();
                            foreach (var inter in typeInterfaces)
                            {
                                if (inter.IsGenericType && inter.GetGenericTypeDefinition() == configurationType)
                                    return true;
                            }
                            return false;
                        })
                            .Select(e => ActivatorUtilities.GetServiceOrCreateInstance(serviceProvider, e))
                            .ToList();
                    }
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

        public Task InitializeAsync(IServiceProvider service)
        {
            return service.GetService<IDataMigrationManager>().UpdateAllFeaturesAsync();
        }
    }
}
