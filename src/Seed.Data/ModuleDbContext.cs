using Microsoft.EntityFrameworkCore;
using Seed.Environment.Engine;
using System.Collections.Generic;
using System.Linq;

namespace Seed.Data
{
    public class ModuleDbContext : DbContext, IDbContext
    {
        readonly IEnumerable<object> _entityConfigurations;
        readonly EngineSettings _settings;

        public DbContext Context => this;

        public DbSet<Document> Document { get; set; }

        public DbSet<MigrationRecord> Migrations { get; set; }

        public ModuleDbContext(
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
            foreach (var configuration in _entityConfigurations)
            {
                modelBuilder.ApplyConfiguration((dynamic)configuration);
            }

            modelBuilder.Model
                .GetEntityTypes()
                .ToList()
                .ForEach(e => modelBuilder.Entity(e.Name).ToTable(e.Relational().TableName, _settings.TablePrefix));

            base.OnModelCreating(modelBuilder);
        }

        public override DbSet<TEntity> Set<TEntity>()
        {
            return Model.FindEntityType(typeof(TEntity)) != null
                ? base.Set<TEntity>()
                : new DocumentDbSet<TEntity>(this);
        }
    }
}
