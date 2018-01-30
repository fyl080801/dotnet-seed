using Microsoft.CSharp;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design.Internal;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Migrations.Design;
using Microsoft.EntityFrameworkCore.Storage;
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
using System.Threading;
using System.Threading.Tasks;

namespace Seed.Data.Migrations
{
    public class DataMigrationManager : IDataMigrationManager
    {
        readonly IDbContext _dbContext;
        // readonly EngineSettings _engineSettings;
        // readonly IPluginManager _pluginManager;
        // readonly ITypeFeatureProvider _typeFeatureProvider;

        // readonly IEnumerable<IDataMigration> _dataMigrations;
        // readonly List<string> _processedFeatures;

        public DataMigrationManager(IDbContext dbContext)
        //,
        //EngineSettings engineDescriptor,
        //IPluginManager pluginManager,
        //ITypeFeatureProvider typeFeatureProvider,
        //IEnumerable<IDataMigration> dataMigrations)
        {
            _dbContext = dbContext;
            // _engineSettings = engineDescriptor;
            // _pluginManager = pluginManager;
            // _typeFeatureProvider = typeFeatureProvider;
            // _dataMigrations = dataMigrations;
            // _processedFeatures = new List<string>();
        }

        public Task<IEnumerable<string>> GetFeaturesByUpdateAsync()
        {
            return Task.FromResult(Enumerable.Empty<string>());
        }

        public Task Uninstall(string feature)
        {
            return RunUpdate();
        }

        public Task UpdateAllFeaturesAsync()
        {
            return RunUpdate();
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
            //        var assembly = Assembly.GetEntryAssembly();
            //        var designTimeServicesBuilder = new DesignTimeServicesBuilder(assembly, new OperationReporter(null));
            //        var efServices = designTimeServicesBuilder.Build((DbContext)_dbContext);
            //        var scaffolder = efServices.GetService<MigrationsScaffolder>();
            //        var assemblyName = assembly.GetName().Name + ".EntityConfigurations." + _engineSettings.Name;
            //        var scaffoldMigration = scaffolder.ScaffoldMigration(assemblyName, assemblyName);

            //        // 数据迁移
            //        var serviceProvider = (IInfrastructure<IServiceProvider>)_dbContext;

            //        var generator = serviceProvider.Instance.GetRequiredService<IMigrationsSqlGenerator>();
            //        var executor = serviceProvider.Instance.GetRequiredService<IMigrationCommandExecutor>();
            //        var connection = serviceProvider.Instance.GetRequiredService<IRelationalConnection>();

            //        var commandList = generator.Generate(dataMigration.MigrationBuilder.Operations);

            //        executor.ExecuteNonQueryAsync(commandList, connection).Wait();

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

        public Task UpdateAsync(string featureId)
        {
            return RunUpdate();
        }

        public Task UpdateAsync(IEnumerable<string> features)
        {
            return RunUpdate();
        }

        private Task RunUpdate()
        {
            return Task.Run(() =>
            {
                var upOperations = _dbContext.ServiceProvider
                                    .GetService<IMigrationsModelDiffer>()
                                    .GetDifferences(null, _dbContext.Model);

                _dbContext.ServiceProvider
                   .GetRequiredService<IMigrationsSqlGenerator>()
                   .Generate(upOperations, _dbContext.Model)
                   .ToList()
                   .ForEach(cmd => _dbContext.Database.ExecuteSqlCommand(cmd.CommandText));
            });
        }

        // public async Task UpdateAsync(string featureId)
        // {
        //     if (_processedFeatures.Contains(featureId))
        //     {
        //         return;
        //     }

        //     _processedFeatures.Add(featureId);

        //     // 获取数据迁移内容的依赖项
        //     var dependencies = _pluginManager.GetFeaturesDependencies(featureId)
        //          .Where(e => e.Id != featureId)
        //          .Select(e => e.Id);

        //     // 更新依赖项
        //     await UpdateAsync(dependencies);

        //     // 获得内容的迁移集合
        //     var migrations = GetMigrations(featureId);
        //     var migrationBuilder = new MigrationBuilder(_dbContext.Database.ProviderName);

        //     // 执行迁移
        //     foreach (var migration in migrations)
        //     {
        //         migration.MigrationBuilder = migrationBuilder;

        //         var migrationTemp = migration;// 前一个迁移存起来
        //         var migrationDefine = migration.GetType().GetCustomAttribute(typeof(MigrationDefineAttribute)) as MigrationDefineAttribute;// 从特性里获得迁移特征
        //         //var migrationRecord = GetCurrentMigrationRecordAsync(migrationDefine.Name).Result;// 获得当前迁移最后一次迁移的记录

        //         //var currentVersion = 0;
        //         //if (migrationRecord != null)// 不存在迁移记录(新安装)
        //         //{
        //         //    currentVersion = migrationDefine.Version;
        //         //}
        //         //else
        //         //{
        //         //    migrationRecord = new MigrationRecord()
        //         //    {
        //         //        FeatureId = featureId,
        //         //        Version = migrationDefine.Version,
        //         //        MigrationName = migrationDefine.Name,
        //         //        MigrationTime = DateTime.Now
        //         //    };
        //         //}

        //         try
        //         {
        //             // 考虑是否迁移全写一个类里面
        //             //if (currentVersion == 0)// 当前表不存在迁移记录需要先创建表
        //             //{
        //             //    var createMethod = GetCreateMethod(migration);
        //             //    if (createMethod != null)
        //             //    {
        //             //        currentVersion = (int)createMethod.Invoke(migration, new object[0]);
        //             //    }
        //             //}

        //             //var lookupTable = CreateUpgradeLookupTable(migration);

        //             //while (lookupTable.ContainsKey(currentVersion))
        //             //{
        //             //    try
        //             //    {
        //             //        currentVersion = (int)lookupTable[currentVersion].Invoke(migration, new object[0]);
        //             //    }
        //             //    catch (Exception ex)
        //             //    {
        //             //        throw ex;
        //             //    }
        //             //}

        //             //// if current is 0, it means no upgrade/create method was found or succeeded
        //             //if (currentVersion == 0)
        //             //{
        //             //    return;
        //             //}

        //             //migrationRecord.Version = currentVersion;
        //         }
        //         catch (Exception ex)
        //         {
        //             throw ex;
        //         }
        //         finally
        //         {
        //             await _dbContext.SaveChangesAsync();
        //         }
        //     }
        // }

        // public async Task UpdateAsync(IEnumerable<string> features)
        // {
        //     foreach (var featureId in features)
        //     {
        //         if (!_processedFeatures.Contains(featureId))
        //         {
        //             await UpdateAsync(featureId);
        //         }
        //     }
        // }

        // private IEnumerable<IDataMigration> GetMigrations(string featureId)
        // {
        //     return _dataMigrations
        //             .Where(e => _typeFeatureProvider.GetFeatureForDependency(e.GetType()).Id == featureId)
        //             .ToList();
        // }

        //private async Task<MigrationRecord> GetCurrentMigrationRecordAsync(string migrationName)
        //{
        //    //var migrationType = migration.GetType();
        //    //var migrationDefine = migrationType.GetCustomAttribute(typeof(MigrationDefineAttribute)) as MigrationDefineAttribute;
        //    //if (migrationDefine == null)
        //    //    return await Task.FromResult<MigrationRecord>(null);

        //    return await _dbContext.Migrations.Where(e => e.MigrationName == migrationName)
        //        //.OrderByDescending(e => e.Version)
        //        .FirstOrDefaultAsync();
        //}

        // private static MethodInfo GetCreateMethod(IDataMigration dataMigration)
        // {
        //     var methodInfo = dataMigration.GetType().GetMethod("Create", BindingFlags.Public | BindingFlags.Instance);
        //     if (methodInfo != null && methodInfo.ReturnType == typeof(int))
        //     {
        //         return methodInfo;
        //     }

        //     return null;
        // }

        // private static Dictionary<int, MethodInfo> CreateUpgradeLookupTable(IDataMigration dataMigration)
        // {
        //     return dataMigration
        //         .GetType()
        //         .GetMethods(BindingFlags.Public | BindingFlags.Instance)
        //         .Select(GetUpdateMethod)
        //         .Where(tuple => tuple != null)
        //         .ToDictionary(tuple => tuple.Item1, tuple => tuple.Item2);
        // }

        // private static Tuple<int, MethodInfo> GetUpdateMethod(MethodInfo mi)
        // {
        //     const string updatefromPrefix = "Upgrade";

        //     if (mi.Name.StartsWith(updatefromPrefix))
        //     {
        //         var version = mi.Name.Substring(updatefromPrefix.Length);
        //         if (int.TryParse(version, out int versionValue))
        //         {
        //             return new Tuple<int, MethodInfo>(versionValue, mi);
        //         }
        //     }

        //     return null;
        // }
    }
}