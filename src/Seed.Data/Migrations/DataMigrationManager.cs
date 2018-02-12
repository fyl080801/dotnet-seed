using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design.Internal;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Migrations.Design;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
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

        readonly IDbContext _dbContext;

        public DataMigrationManager(IDbContext dbContext)
        {
            _dbContext = dbContext;
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
                IModel lastModel = null;
                try
                {
                    var lastMigration = _dbContext.Migrations.OrderByDescending(e => e.MigrationTime).FirstOrDefault();
                    lastModel = lastMigration == null ? null : (CreateModelSnapshot(lastMigration.SnapshotDefine).Result?.Model);
                }
                catch (SqlException) { }

                // 需要从历史版本库中取出快照定义，反序列化成类型 GetDifferences(快照模型, context.Model);
                // 实际情况下要传入历史快照
                var modelDiffer = _dbContext.Context
                    .GetInfrastructure()
                    .GetService<IMigrationsModelDiffer>();
                var hasDiffer = modelDiffer.HasDifferences(lastModel, _dbContext.Context.Model);

                if (hasDiffer)
                {
                    var upOperations = modelDiffer.GetDifferences(lastModel, _dbContext.Context.Model);

                    _dbContext.Context.GetInfrastructure()
                        .GetRequiredService<IMigrationsSqlGenerator>()
                        .Generate(upOperations, _dbContext.Context.Model)
                        .ToList()
                        .ForEach(cmd => _dbContext.Context.Database.ExecuteSqlCommand(cmd.CommandText));

                    var snapshotCode = new DesignTimeServicesBuilder(typeof(ModuleDbContext).Assembly, new ModuleDbOperationReporter())
                        .Build((DbContext)_dbContext)
                        .GetService<IMigrationsCodeGenerator>()
                        .GenerateSnapshot(ContextAssembly, typeof(ModuleDbContext), SnapshotName, _dbContext.Context.Model);

                    _dbContext.Migrations.Add(new MigrationRecord()
                    {
                        SnapshotDefine = snapshotCode,
                        MigrationTime = DateTime.Now
                    });

                    _dbContext.SaveChanges();
                }
            });
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
    }
}