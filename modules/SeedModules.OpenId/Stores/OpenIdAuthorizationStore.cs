using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Options;
using OpenIddict.EntityFrameworkCore;
using Seed.Data;

namespace SeedModules.OpenId.Stores
{
    public class OpenIdAuthorizationStore : OpenIddictAuthorizationStore<DbContext>
    {
        public OpenIdAuthorizationStore(
            IDbContext context,
            IMemoryCache cache,
            IOptionsMonitor<OpenIddictEntityFrameworkCoreOptions> optionsMonitor)
            : base(cache, context.Context, optionsMonitor)
        {
        }
    }
}
