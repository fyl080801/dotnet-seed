using Newtonsoft.Json.Linq;

namespace SeedCore.Infrastructure.Entities
{
    public interface IJEntity
    {
        JObject Properties { get; }
    }
}
