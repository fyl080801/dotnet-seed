using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Seed.Data;
using Seed.Environment.Engine;
using SeedModules.PageBuilder.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Reflection.Emit;

namespace SeedModules.PageBuilder.Data
{
    public class PageBuilderDbContext : DbContext, IDbContext
    {
        readonly IEnumerable<TableModel> _tables;
        readonly EngineSettings _settings;

        public DbContext Context => this;

        public DbSet<MigrationRecord> Migrations { get; set; }

        public PageBuilderDbContext(
            DbContextOptions options,
            EngineSettings settings,
            params TableModel[] tables)
            : base(options)
        {
            _tables = tables;
            _settings = settings;
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new PbMigrationTypeConfiguration());

            var dyTypes = ResolveTypeConfigurations(_tables.ToArray());
            foreach (var table in dyTypes)
            {
                modelBuilder.ApplyConfiguration((dynamic)table);
            }

            modelBuilder.Model
                .GetEntityTypes()
                .ToList()
                .ForEach(e => modelBuilder.Entity(e.Name).ToTable($"{_settings.TablePrefix}_pb_{e.Relational().TableName}"));

            base.OnModelCreating(modelBuilder);
        }

        private object[] ResolveTypeConfigurations(TableModel[] models)
        {
            var dynamicName = new AssemblyName("SeedModules.PageBuilder.Dynamic");
            var assemblyBuilder = AssemblyBuilder.DefineDynamicAssembly(dynamicName, AssemblyBuilderAccess.RunAndCollect);
            var moduleBuilder = assemblyBuilder.DefineDynamicModule(dynamicName.Name);
            var result = new List<object>();
            foreach (var model in models)
            {
                var typeBuilder = moduleBuilder.DefineType(model.Name);
                foreach (var column in model.Columns)
                {
                    typeBuilder.DefineProperty(column.Name, PropertyAttributes.HasDefault, ConvertType(column.Type), null);
                }
                var entityType = typeBuilder.CreateTypeInfo().AsType();
                var configurationType = typeof(BuilderTypeConfiguration<>).MakeGenericType(entityType);
                var finallyTypeBuilder = moduleBuilder.DefineType(model.Name + "Configuration", TypeAttributes.Public, configurationType);

                var finallyConstructor = finallyTypeBuilder.DefineConstructor(MethodAttributes.Public, CallingConventions.Standard, new[] { typeof(TableModel) });
                var myConstructorIL = finallyConstructor.GetILGenerator();
                myConstructorIL.Emit(OpCodes.Ldarg_0);
                myConstructorIL.Emit(OpCodes.Ldarg_1);
                myConstructorIL.Emit(OpCodes.Call, configurationType.GetConstructor(new[] { typeof(TableModel) }));
                myConstructorIL.Emit(OpCodes.Ret);
                var finallyType = finallyTypeBuilder.CreateTypeInfo();
                result.Add(Activator.CreateInstance(finallyType, model));
            }

            return result.ToArray();
        }

        public static Type ConvertType(DataTypes dataType)
        {
            switch (dataType)
            {
                case DataTypes.Datetime:
                    return typeof(DateTime);
                case DataTypes.Decimal:
                    return typeof(decimal);
                case DataTypes.Int:
                    return typeof(int);
                case DataTypes.String:
                    return typeof(string);
                default:
                    return typeof(string);
            }
        }
    }

    // 用于可配置数据Context的数据迁移表映射
    public class PbMigrationTypeConfiguration : IEntityTypeConfiguration<MigrationRecord>
    {
        public void Configure(EntityTypeBuilder<MigrationRecord> builder)
        {
            builder.ToTable("_PageBuilderMigration")
                .HasKey(e => e.Id);
        }
    }
}
