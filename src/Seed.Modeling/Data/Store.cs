﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Seed.Data
{
    public class Store : IStore
    {
        readonly DbContextOptionsBuilder _dbContextOptionsBuilder;

        public Store(DbContextOptionsBuilder dbContextOptionsBuilder)
        {
            _dbContextOptionsBuilder = dbContextOptionsBuilder;
        }

        public DbContext CreateDbContext(IServiceProvider serviceProvider)
        {
            return new ModuleDbContext(_dbContextOptionsBuilder.Options, serviceProvider);
        }

        public Task InitializeAsync(IServiceProvider serviceProvider)
        {
            return new ModuleDbContext(_dbContextOptionsBuilder.Options, serviceProvider).Database.MigrateAsync();
        }
    }
}
