using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design.Internal;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations.Design;
using Microsoft.Extensions.DependencyInjection;
using Seed.Environment.Engine;
using Seed.Plugins;
using Seed.Plugins.Feature;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace Seed.Data
{
    public class DataMigrationManager : IDataMigrationManager
    {
        readonly DbContext _dbContext;
        readonly EngineSettings _engineSettings;
        readonly IPluginManager _pluginManager;
        readonly ITypeFeatureProvider _typeFeatureProvider;
        readonly IServiceProvider _serviceProvider;

        public DataMigrationManager(
            DbContext dbContext,
            EngineSettings engineDescriptor,
            IPluginManager pluginManager,
            ITypeFeatureProvider typeFeatureProvider)
        {
            _dbContext = dbContext;
            _engineSettings = engineDescriptor;
            _pluginManager = pluginManager;
            _typeFeatureProvider = typeFeatureProvider;
            _serviceProvider = ((IInfrastructure<IServiceProvider>)_dbContext).Instance;
        }

        public Task<IEnumerable<string>> GetFeaturesByUpdateAsync()
        {
            return Task.FromResult(Enumerable.Empty<string>());
        }

        public Task Uninstall(string feature)
        {
            return Task.CompletedTask;
        }

        public Task UpdateAllFeaturesAsync()
        {
            var path = Path.Combine(AppContext.BaseDirectory, "Migrations/").Replace("/", "\\");

            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
            }

            return Task.Run(() =>
            {
                using (_dbContext)
                {
                    var assembly = Assembly.GetEntryAssembly();
                    var designTimeServicesBuilder = new DesignTimeServicesBuilder(assembly, new OperationReporter(null));
                    var efServices = designTimeServicesBuilder.Build(_dbContext);
                    var scaffolder = efServices.GetService<MigrationsScaffolder>();
                    var assemblyName = assembly.GetName().Name;

                    scaffolder.Save(
                        Path.Combine(path, "..\\"),
                        scaffolder.ScaffoldMigration(assemblyName + ".EntityConfigurations." + _engineSettings.Name, assemblyName + ".EntityConfigurations." + _engineSettings.Name),
                        path
                    );

                    _dbContext.Database.MigrateAsync();
                }
            });
        }

        public Task UpdateAsync(string feature)
        {
            return Task.CompletedTask;
        }

        public Task UpdateAsync(IEnumerable<string> features)
        {
            return Task.CompletedTask;
        }
    }
}