using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design.Internal;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Internal;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Migrations.Design;
using Microsoft.EntityFrameworkCore.Migrations.Internal;
using Microsoft.Extensions.DependencyInjection;
using Seed.Plugins;
using Seed.Plugins.Feature;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace Seed.Data
{
    public class DataMigrationManager : IDataMigrationManager
    {
        readonly DbContext _dbContext;
        readonly IPluginManager _pluginManager;
        readonly ITypeFeatureProvider _typeFeatureProvider;
        readonly IServiceProvider _serviceProvider;

        public DataMigrationManager(
            DbContext dbContext,
            IPluginManager pluginManager,
            ITypeFeatureProvider typeFeatureProvider)
        {
            _dbContext = dbContext;
            _pluginManager = pluginManager;
            _typeFeatureProvider = typeFeatureProvider;
            _serviceProvider = ((IInfrastructure<IServiceProvider>)_dbContext).Instance;
        }

        public Task Uninstall(string feature)
        {
            return Task.CompletedTask;
        }

        public Task UpdateAllFeaturesAsync()
        {
            var path = Path.Combine(Directory.GetCurrentDirectory(), "Migrations/").Replace("/", "\\");

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
                    var scaffolder = _dbContext.GetService<MigrationsScaffolder>();

                    scaffolder.Save(
                        Path.Combine(path, "..\\"),
                        scaffolder.ScaffoldMigration(assembly.FullName + ".EntityConfigurations.Migrations", assembly.FullName + ".EntityConfigurations"),
                        path
                    );


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