using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using OpenIddict.EntityFrameworkCore;
using Seed.Data;
using System;
using System.Collections.Generic;
using System.Text;

namespace SeedModules.OpenId.Stores
{
    public class OpenIddictAuthorizationStore : OpenIddictAuthorizationStore<DbContext>
    {
        public OpenIddictAuthorizationStore(IDbContext context, IMemoryCache cache) : base(context.Context, cache)
        {
        }
    }
}
