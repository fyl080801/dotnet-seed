using Newtonsoft.Json.Linq;

namespace SeedCore.Data
{
    public interface IJEntity
    {
        JObject Properties { get; }
    }
}
