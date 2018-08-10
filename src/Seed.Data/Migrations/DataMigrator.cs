using System;
using System.Data.Common;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design.Internal;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Migrations.Design;
using Microsoft.Extensions.DependencyInjection;

namespace Seed.Data.Migrations
{
    public class DataMigrator : IDataMigrator
    {
        const string ContextAssembly = "Seed.Data.Migration";
        const string SnapshotName = "ModuleDbSnapshot";

        readonly IDbContext _context;

        public DataMigrator(IDbContext context)
        {
            _context = context;
        }

        public async Task RunAsync()
        {
            IModel lastModel = null;
            try
            {
                var lastMigration = _context.Migrations
                    .OrderByDescending(e => e.MigrationTime)
                    .OrderByDescending(e => e.Id) // mysql下自动生成的时间日期字段时间精度为秒
                    .FirstOrDefault();
                lastModel = lastMigration == null ? null : ((await CreateModelSnapshot(Encoding.UTF8.GetString(Convert.FromBase64String(lastMigration.SnapshotDefine))))?.Model);
            }
            catch (DbException) { }

            // 需要从历史版本库中取出快照定义，反序列化成类型 GetDifferences(快照模型, context.Model);
            // 实际情况下要传入历史快照
            var modelDiffer = _context.Context
                .GetInfrastructure()
                .GetService<IMigrationsModelDiffer>();
            var hasDiffer = modelDiffer.HasDifferences(lastModel, _context.Context.Model);

            if (hasDiffer)
            {
                var upOperations = modelDiffer.GetDifferences(lastModel, _context.Context.Model);

                using (var trans = _context.Context.Database.BeginTransaction())
                {
                    try
                    {
                        _context.Context.GetInfrastructure()
                            .GetRequiredService<IMigrationsSqlGenerator>()
                            .Generate(upOperations, _context.Context.Model)
                            .ToList()
                            .ForEach(cmd => _context.Context.Database.ExecuteSqlCommand(cmd.CommandText));

                        _context.Context.Database.CommitTransaction();
                    }
                    catch (DbException ex)
                    {
                        _context.Context.Database.RollbackTransaction();
                        throw ex;
                    }

                    var snapshotCode = new DesignTimeServicesBuilder(typeof(ModuleDbContext).Assembly, new ModuleDbOperationReporter(), new string[0])
                        .Build((DbContext)_context)
                        .GetService<IMigrationsCodeGenerator>()
                        .GenerateSnapshot(ContextAssembly, typeof(ModuleDbContext), SnapshotName, _context.Context.Model);

                    _context.Migrations.Add(new MigrationRecord()
                    {
                        SnapshotDefine = Convert.ToBase64String(Encoding.UTF8.GetBytes(snapshotCode)),
                        MigrationTime = DateTime.Now
                    });

                    await _context.Context.SaveChangesAsync(true);
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
    }
}