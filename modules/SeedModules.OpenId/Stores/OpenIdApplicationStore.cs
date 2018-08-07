using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Options;
using OpenIddict.EntityFrameworkCore;
using Seed.Data;

namespace SeedModules.OpenId.Stores
{
    public class OpenIdApplicationStore : OpenIddictApplicationStore<DbContext>
    {
        public OpenIdApplicationStore(
            IDbContext context,
            IMemoryCache cache,
            IOptionsMonitor<OpenIddictEntityFrameworkCoreOptions> optionsMonitor)
            : base(cache, context.Context, optionsMonitor)
        {
        }
    }
}
