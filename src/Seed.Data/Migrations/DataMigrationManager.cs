using Microsoft.CSharp;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design.Internal;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Migrations.Design;
using Microsoft.Extensions.DependencyInjection;
using Seed.Environment.Engine;
using Seed.Plugins;
using Seed.Plugins.Feature;
using System;
using System.CodeDom.Compiler;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace Seed.Data.Migrations
{
    public class DataMigrationManager : IDataMigrationManager
    {
        readonly IDbContext _dbContext;
        readonly EngineSettings _engineSettings;
        readonly IPluginManager _pluginManager;
        readonly ITypeFeatureProvider _typeFeatureProvider;

        readonly IEnumerable<IDataMigration> _dataMigrations;
        readonly List<string> _processedFeatures;

        public DataMigrationManager(
            IDbContext dbContext,
            EngineSettings engineDescriptor,
            IPluginManager pluginManager,
            ITypeFeatureProvider typeFeatureProvider,
            IEnumerable<IDataMigration> dataMigrations)
        {
            _dbContext = dbContext;
            _engineSettings = engineDescriptor;
            _pluginManager = pluginManager;
            _typeFeatureProvider = typeFeatureProvider;
            _dataMigrations = dataMigrations;
            _processedFeatures = new List<string>();
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

            return Task.CompletedTask;
            #region nouse
            //var path = Path.Combine(AppContext.BaseDirectory, "Migrations/" + _engineSettings.Name).Replace("/", "\\");

            //if (!Directory.Exists(path))
            //{
            //    Directory.CreateDirectory(path);
            //}

            //return Task.Run(() =>
            //{
            //    using (_dbContext)
            //    {
            //        //var assembly = Assembly.GetEntryAssembly();
            //        //var designTimeServicesBuilder = new DesignTimeServicesBuilder(assembly, new OperationReporter(null));
            //        //var efServices = designTimeServicesBuilder.Build((DbContext)_dbContext);
            //        //var scaffolder = efServices.GetService<MigrationsScaffolder>();
            //        //var assemblyName = assembly.GetName().Name + ".EntityConfigurations." + _engineSettings.Name;
            //        //var scaffoldMigration = scaffolder.ScaffoldMigration(assemblyName, assemblyName);

            //        // 数据迁移
            //        //var serviceProvider = (IInfrastructure<IServiceProvider>)dbContext;

            //        //var generator = serviceProvider.Instance.GetRequiredService<IMigrationsSqlGenerator>();
            //        //var executor = serviceProvider.Instance.GetRequiredService<IMigrationCommandExecutor>();
            //        //var connection = serviceProvider.Instance.GetRequiredService<IRelationalConnection>();

            //        //var commandList = generator.Generate(dataMigration.MigrationBuilder.Operations);

            //        //executor.ExecuteNonQueryAsync(commandList, connection).Wait();

            //        //scaffolder.Save(
            //        //    Path.Combine(path, "..\\"),
            //        //    scaffoldMigration,
            //        //    path
            //        //);

            //        //CodeDomProvider compiler = new CSharpCodeProvider();
            //        //CompilerParameters comPara = new CompilerParameters
            //        //{
            //        //    GenerateExecutable = false,
            //        //    GenerateInMemory = true,
            //        //    OutputAssembly = assemblyName
            //        //};
            //        //comPara.ReferencedAssemblies.Add("Microsoft.EntityFrameworkCore");
            //        //comPara.ReferencedAssemblies.Add("Seed.Data");
            //        //comPara.ReferencedAssemblies.Add("System");

            //        //var result = compiler.CompileAssemblyFromSource(comPara, new[]
            //        //{
            //        //    scaffoldMigration.MetadataCode,
            //        //    scaffoldMigration.MigrationCode,
            //        //    scaffoldMigration.SnapshotCode
            //        //});

            //        _dbContext.Database.MigrateAsync();
            //    }
            //});
            #endregion
        }

        public async Task UpdateAsync(string featureId)
        {
            if (_processedFeatures.Contains(featureId))
            {
                return;
            }

            _processedFeatures.Add(featureId);

            var dependencies = _pluginManager.GetFeaturesDependencies(featureId)
                 .Where(e => e.Id != featureId)
                 .Select(e => e.Id);

            await UpdateAsync(dependencies);

            var migrations = GetMigrations(featureId);
            var migrationBuilder = new MigrationBuilder(_dbContext.Database.ProviderName);

            foreach (var migration in migrations)
            {
                migration.MigrationBuilder = migrationBuilder;

                var migrationTemp = migration;
                var migrationDefine = migration.GetType().GetCustomAttribute(typeof(MigrationDefineAttribute)) as MigrationDefineAttribute;
                var migrationRecord = GetCurrentMigrationRecordAsync(migrationDefine.Name).Result;

                if (migrationRecord != null)
                {

                }
                else
                {
                    migrationRecord = new MigrationRecord()
                    {
                        FeatureId = featureId,

                    };
                }
            }
        }

        public async Task UpdateAsync(IEnumerable<string> features)
        {
            foreach (var featureId in features)
            {
                if (!_processedFeatures.Contains(featureId))
                {
                    await UpdateAsync(featureId);
                }
            }
        }

        private IEnumerable<IDataMigration> GetMigrations(string featureId)
        {
            return _dataMigrations
                    .Where(e => _typeFeatureProvider.GetFeatureForDependency(e.GetType()).Id == featureId)
                    .ToList();
        }

        private async Task<MigrationRecord> GetCurrentMigrationRecordAsync(string migrationName)
        {
            //var migrationType = migration.GetType();
            //var migrationDefine = migrationType.GetCustomAttribute(typeof(MigrationDefineAttribute)) as MigrationDefineAttribute;
            //if (migrationDefine == null)
            //    return await Task.FromResult<MigrationRecord>(null);

            return await _dbContext.Migrations.Where(e => e.MigrationName == migrationName).OrderByDescending(e => e.Version).FirstOrDefaultAsync();
        }
    }
}