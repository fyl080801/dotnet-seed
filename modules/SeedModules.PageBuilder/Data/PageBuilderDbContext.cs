using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Seed.Data;
using Seed.Environment.Engine;
using SeedModules.PageBuilder.Models;
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
            _tables = tables;
            _settings = settings;
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new PbMigrationTypeConfiguration());

            foreach (var table in _tables)
            {
                modelBuilder.ApplyConfiguration(new BuilderTypeConfiguration(table));
            }

            modelBuilder.Model
                .GetEntityTypes()
                .ToList()
                .ForEach(e => modelBuilder.Entity(e.Name).ToTable($"{_settings.TablePrefix}_pb_{e.Relational().TableName}"));

            base.OnModelCreating(modelBuilder);
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
