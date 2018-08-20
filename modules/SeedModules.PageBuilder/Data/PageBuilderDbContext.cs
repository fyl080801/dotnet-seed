using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Seed.Data;
using Seed.Environment.Engine;
using SeedModules.PageBuilder.Models;
using System;
using System.Collections.Generic;
using System.Linq;

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
            _tables = tables.Where(e => e.Columns.Count > 0).ToArray();
            _settings = settings;
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new PbMigrationTypeConfiguration());

            // 这里回头改成先统一生成程序集再一起创建EntityTypeConfiguration的对象
            foreach (var model in _tables)
            {
                var domainType = ClassHelper.AddPropertyToType(ClassHelper.BuildType(model.Name), model.Columns.Select(e => new ClassHelper.CustPropertyInfo(ConvertType(e).FullName, e.Name)).ToList());
                var configurationType = typeof(BuilderTypeConfiguration<>).MakeGenericType(domainType);
                modelBuilder.ApplyConfiguration((dynamic)Activator.CreateInstance(configurationType, model));
            }

            modelBuilder.Model
                .GetEntityTypes()
                .ToList()
                .ForEach(e => modelBuilder.Entity(e.Name).ToTable($"{_settings.TablePrefix}_pb_{e.Relational().TableName}"));

            base.OnModelCreating(modelBuilder);
        }

        public static Type ConvertType(ColumnModel column)
        {
            switch (column.Type)
            {
                case DataTypes.Datetime:
                    return column.IsRequired ? typeof(DateTime) : typeof(DateTime?);
                case DataTypes.Decimal:
                    return column.IsRequired ? typeof(decimal) : typeof(decimal?);
                case DataTypes.Int:
                    return column.IsRequired ? typeof(int) : typeof(int?);
                case DataTypes.Double:
                    return column.IsRequired ? typeof(double) : typeof(double?);
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
