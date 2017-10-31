using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Seed.Plugins;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Seed.Data
{
    public class ModuleDbContext : DbContext
    {
        IServiceProvider _serviceProvider;

        public ModuleDbContext(DbContextOptions options, IServiceProvider serviceProvider) : base(options)
        {
            _serviceProvider = serviceProvider;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            var source = new List<TypeInfo>();
            foreach (var typeInfo in source.Distinct())
            {
                var typeInstance = ActivatorUtilities.CreateInstance(_serviceProvider, typeInfo);
                modelBuilder.ApplyConfiguration((dynamic)typeInstance);
            }

            base.OnModelCreating(modelBuilder);
        }
    }
}
