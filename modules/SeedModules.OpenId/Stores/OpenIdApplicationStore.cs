using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using OpenIddict.EntityFrameworkCore;
using Seed.Data;

namespace SeedModules.OpenId.Stores
{
    public class OpenIdApplicationStore : OpenIddictApplicationStore<DbContext>
    {
        public OpenIdApplicationStore(IDbContext context, IMemoryCache cache) : base(context.Context, cache)
        {
        }
    }
}
