using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Seed.Environment.Engine;
using System.Collections.Generic;
using System.Linq;

namespace Seed.Data
{
    public class PageBuilderDbContext : DbContext, IDbContext
    {
        readonly IEnumerable<object> _entityConfigurations;
        readonly EngineSettings _settings;

        public DbContext Context => this;

        public DbSet<MigrationRecord> Migrations { get; set; }

        public PageBuilderDbContext(
            DbContextOptions options,
            EngineSettings settings,
            params object[] entityConfigurations)
            : base(options)
        {
            _entityConfigurations = entityConfigurations;
            _settings = settings;
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new PbMigrationTypeConfiguration());

            foreach (var configuration in _entityConfigurations)
            {
                modelBuilder.ApplyConfiguration((dynamic)configuration);
            }

            modelBuilder.Model
                .GetEntityTypes()
                .ToList()
                .ForEach(e => modelBuilder.Entity(e.Name).ToTable(string.Format("{0}_{1}", _settings.TablePrefix, e.Relational().TableName)));

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
