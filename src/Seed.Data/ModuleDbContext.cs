using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace Seed.Data
{
    public class ModuleDbContext : DbContext, IDbContext
    {
        readonly IEnumerable<object> _entityConfigurations;

        public DbSet<Document> Document { get; set; }

        public DbSet<MigrationRecord> Migrations { get; set; }

        public ModuleDbContext(DbContextOptions options, params object[] entityConfigurations)
            : base(options)
        {
            _entityConfigurations = entityConfigurations;
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            foreach (var configuration in _entityConfigurations)
            {
                modelBuilder.ApplyConfiguration((dynamic)configuration);
            }

            base.OnModelCreating(modelBuilder);
        }

        public override DbSet<TEntity> Set<TEntity>()
        {
            if (Model.HasEntityTypeWithDefiningNavigation(nameof(TEntity)))
            {
                return base.Set<TEntity>();
            }
            else
            {
                if (typeof(TEntity).IsAssignableFrom(typeof(IEntity)))
                    return new DocumentDbSet<TEntity>(this);
                else
                    throw new System.Exception();
            }
        }
    }
}
