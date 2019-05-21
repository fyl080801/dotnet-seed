using Microsoft.AspNetCore.Http;

namespace SeedCore
{
    public interface ISeedHelper
    {
        HttpContext HttpContext { get; }
    }
}
