using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design.Internal;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Migrations.Design;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using MySql.Data.MySqlClient;
using Seed.Environment.Engine;
using Seed.Environment.Engine.Descriptors;
using Seed.Environment.Engine.Extensions;
using Seed.Plugins;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace Seed.Data.Migrations
{
    public class DataMigrationManager : IDataMigrationManager
    {
        const string ContextAssembly = "Seed.Data.Migration";
        const string SnapshotName = "ModuleDbSnapshot";

        readonly IStore _store;
        readonly IPluginManager _pluginManager;
        readonly IEngineStateManager _engineStateManager;
        readonly EngineSettings _engineSettings;
        readonly EngineDescriptor _engineDescriptor;
        readonly IServiceProvider _serviceProvider;
        readonly ILogger _logger;

        public DataMigrationManager(
            IStore store,
            IPluginManager pluginManager,
            IEngineStateManager engineStateManager,
            EngineSettings engineSettings,
            EngineDescriptor engineDescriptor,
            IServiceProvider serviceProvider,
            ILogger<DataMigrationManager> logger)
        {
            _store = store;
            _pluginManager = pluginManager;
            _engineStateManager = engineStateManager;
            _engineSettings = engineSettings;
            _engineDescriptor = engineDescriptor;
            _serviceProvider = serviceProvider;
            _logger = logger;
        }

        public Task<IEnumerable<string>> GetFeaturesByUpdateAsync()
        {
            return Task.FromResult(Enumerable.Empty<string>());
        }

        public Task Uninstall(string feature)
        {
            return RunUpdateAsync();
        }

        public Task UpdateAllFeaturesAsync()
        {
            return RunUpdateAsync();
        }

        public Task UpdateAsync(string featureId)
        {
            return RunUpdateAsync();
        }

        public Task UpdateAsync(IEnumerable<string> features)
        {
            return RunUpdateAsync();
        }

        private async Task RunUpdateAsync()
        {
            var _dbContext = await CreateDbContext();

            IModel lastModel = null;
            try
            {
                var lastMigration = _dbContext.Migrations.OrderByDescending(e => e.MigrationTime).FirstOrDefault();
                lastModel = lastMigration == null ? null : (CreateModelSnapshot(lastMigration.SnapshotDefine).Result?.Model);
            }
            catch (DbException) { }

            // 需要从历史版本库中取出快照定义，反序列化成类型 GetDifferences(快照模型, context.Model);
            // 实际情况下要传入历史快照
            var modelDiffer = _dbContext.Context
                .GetInfrastructure()
                .GetService<IMigrationsModelDiffer>();
            var hasDiffer = modelDiffer.HasDifferences(lastModel, _dbContext.Context.Model);

            if (hasDiffer)
            {
                var upOperations = modelDiffer.GetDifferences(lastModel, _dbContext.Context.Model);

                using (var trans = _dbContext.Context.Database.BeginTransaction())
                {
                    try
                    {
                        _dbContext.Context.GetInfrastructure()
                            .GetRequiredService<IMigrationsSqlGenerator>()
                            .Generate(upOperations, _dbContext.Context.Model)
                            .ToList()
                            .ForEach(cmd => _dbContext.Context.Database.ExecuteSqlCommand(cmd.CommandText));

                        trans.Commit();
                    }
                    catch (Exception ex)
                    {
                        trans.Rollback();
                        throw ex;
                    }

                    var snapshotCode = new DesignTimeServicesBuilder(typeof(ModuleDbContext).Assembly, new ModuleDbOperationReporter())
                        .Build((DbContext)_dbContext)
                        .GetService<IMigrationsCodeGenerator>()
                        .GenerateSnapshot(ContextAssembly, typeof(ModuleDbContext), SnapshotName, _dbContext.Context.Model);

                    _dbContext.Migrations.Add(new MigrationRecord()
                    {
                        SnapshotDefine = snapshotCode,
                        MigrationTime = DateTime.Now
                    });

                    _dbContext.Context.SaveChanges();
                }
            }
        }

        private Task<ModelSnapshot> CreateModelSnapshot(string codedefine)
        {
            // 生成快照，需要存到数据库中供更新版本用
            var references = typeof(ModuleDbContext).Assembly
                .GetReferencedAssemblies()
                .Select(e => MetadataReference.CreateFromFile(Assembly.Load(e).Location))
                .Union(new MetadataReference[]
                {
                    MetadataReference.CreateFromFile(Assembly.Load("netstandard").Location),
                    MetadataReference.CreateFromFile(Assembly.Load("System.Runtime").Location),
                    MetadataReference.CreateFromFile(typeof(Object).Assembly.Location),
                    MetadataReference.CreateFromFile(typeof(ModuleDbContext).Assembly.Location)
                });

            var compilation = CSharpCompilation.Create(ContextAssembly)
                .WithOptions(new CSharpCompilationOptions(OutputKind.DynamicallyLinkedLibrary))
                .AddReferences(references)
                .AddSyntaxTrees(SyntaxFactory.ParseSyntaxTree(codedefine));

            return Task.Run(() =>
            {
                using (var stream = new MemoryStream())
                {
                    var compileResult = compilation.Emit(stream);
                    return compileResult.Success
                        ? Assembly.Load(stream.GetBuffer()).CreateInstance(ContextAssembly + "." + SnapshotName) as ModelSnapshot
                        : null;
                }
            });
        }

        private async Task<IDbContext> CreateDbContext()
        {
            var features = new string[0];
            try
            {
                var engineState = await _engineStateManager.GetEngineStateAsync();
                features = engineState.Features.Where(e => e.IsInstalled).Select(e => e.Id).ToArray();
            }
            catch (DbException)
            {
                features = _engineDescriptor.Features.Select(e => e.Id).ToArray();
            }

            return _store.CreateDbContext(GetFeatureTypeConfigurations(features));
        }

        private IEnumerable<object> GetFeatureTypeConfigurations(IEnumerable<string> features)
        {
            var providers = new List<IEntityTypeConfigurationProvider>();
            var providerType = typeof(IEntityTypeConfigurationProvider);
            _pluginManager.GetFeatures(features.ToArray())
                .Select(e => e.Plugin)
                .Distinct()
                .Select(e =>
                    _pluginManager.GetPluginEntryAsync(e).Result.Exports
                        .Where(pro => providerType.IsAssignableFrom(pro))
                        .Select(pro => ActivatorUtilities.GetServiceOrCreateInstance(_serviceProvider, pro) as IEntityTypeConfigurationProvider)
                        .ToList())
                .ToList()
                .ForEach(list =>
                {
                    providers = providers.Concat(list).ToList();
                });

            return providers.InvokeAsync(e => e.GetEntityTypeConfigurationsAsync(), _logger).GetAwaiter().GetResult();
        }
    }
}