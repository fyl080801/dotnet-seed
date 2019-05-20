using Microsoft.AspNetCore.Http;

namespace SeedCore.Modules
{
    public class DefaultOrchardHelper : IOrchardHelper
    {
        public DefaultOrchardHelper(IHttpContextAccessor httpContextAccessor)
        {
            HttpContext = httpContextAccessor.HttpContext;
        }

        public HttpContext HttpContext { get; set; }
    }
}
