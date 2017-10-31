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

        public Task UpdateAllFeaturesAsync()
        {
            var path = Path.Combine(AppContext.BaseDirectory, "Migrations/").Replace("/", "\\");
            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
            }
            else
            {
                Directory.GetFiles(path).ToList().ForEach(File.Delete);
            }

            using (_dbContext)
            {
                var migrationsGenerator = _serviceProvider.GetService<CSharpMigrationsGenerator>();
                var scaffolderDependencies = _serviceProvider.GetService<MigrationsScaffolderDependencies>()
                   .With(migrationsGenerator);

                var scaffolder = new MigrationsScaffolder(scaffolderDependencies);

                var projectDir = Path.Combine(path, "..\\");

                var readonlyDic = new ReadOnlyDictionary<string, TypeInfo>(new Dictionary<string, TypeInfo>());
                var migration = scaffolder.ScaffoldMigration("Seed.Migrations", "Seed");

                scaffolder.Save(projectDir, migration, path);

                return Task.CompletedTask;
            }
        }
    }
}