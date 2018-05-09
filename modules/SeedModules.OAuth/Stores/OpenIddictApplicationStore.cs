using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using OpenIddict.EntityFrameworkCore;
using Seed.Data;
using System;
using System.Collections.Generic;
using System.Text;

namespace SeedModules.OAuth.Stores
{
    public class OpenIddictApplicationStore : OpenIddictApplicationStore<DbContext>
    {
        public OpenIddictApplicationStore(IDbContext context, IMemoryCache cache) : base(context.Context, cache)
        {
        }
    }
}
