using Microsoft.AspNetCore.Http;

namespace SeedCore.Modules
{
    public class DefaultSeedHelper : ISeedHelper
    {
        public DefaultSeedHelper(IHttpContextAccessor httpContextAccessor)
        {
            HttpContext = httpContextAccessor.HttpContext;
        }

        public HttpContext HttpContext { get; set; }
    }
}
