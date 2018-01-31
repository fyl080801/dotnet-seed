using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Seed.Data.Migrations;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Seed.Data
{
    public class ModuleDbContext : DbContext, IDbContext
    {
        readonly IEnumerable<object> _entityConfigurations;

        public DbSet<Document> Document { get; set; }

        public DbContext Context => this;

        public ModuleDbContext(DbContextOptions options, params object[] entityConfigurations)
            : base(options)
        {
            _entityConfigurations = entityConfigurations;
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Model.AddEntityType(typeof(MigrationRecord));

            foreach (var configuration in _entityConfigurations)
            {
                modelBuilder.ApplyConfiguration((dynamic)configuration);
            }

            modelBuilder.Model
                .GetEntityTypes()
                .ToList()
                .ForEach(e =>
                {
                    modelBuilder.Entity(e.Name).ToTable("_" + e.Relational().TableName);
                });

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
