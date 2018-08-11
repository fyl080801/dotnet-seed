using Seed.Data;
using Seed.Environment.Engine;
using SeedModules.PageBuilder.Data;
using SeedModules.PageBuilder.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace SeedModules.PageBuilder.Extensions
{
    public static class StoreExtensions
    {
        public static IDbContext CreatePbDbContext(this IStore store, EngineSettings settings, params TableModel[] tables)
        {
            return new PageBuilderDbContext(store.CreateOptions(), settings, tables);
        }
    }
}
