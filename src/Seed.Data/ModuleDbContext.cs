using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Seed.Data.Migrations;
using System;
using System.Collections.Generic;

namespace Seed.Data
{
    public class ModuleDbContext : DbContext, IDbContext
    {
        readonly IEnumerable<object> _entityConfigurations;

        public DbSet<Document> Document { get; set; }

        public DbSet<MigrationRecord> Migrations { get; set; }

        public IServiceProvider ServiceProvider => ((IInfrastructure<IServiceProvider>)this).Instance;

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
                return new DocumentDbSet<TEntity>(this);
            }
        }
    }
}
