using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using OpenIddict.EntityFrameworkCore;
using Seed.Data;
using System;
using System.Collections.Generic;
using System.Text;

namespace SeedModules.OpenId.Stores
{
    public class OpenIddictScopeStore : OpenIddictScopeStore<DbContext>
    {
        public OpenIddictScopeStore(IDbContext context, IMemoryCache cache) : base(context.Context, cache)
        {
        }
    }
}
