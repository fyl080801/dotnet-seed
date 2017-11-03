using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace Seed.Data
{
    public class ModuleDbContext : DbContext
    {
        readonly IEnumerable<object> _entityConfigurations;

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
    }
}
