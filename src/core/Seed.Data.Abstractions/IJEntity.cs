using Newtonsoft.Json.Linq;

namespace Seed.Data
{
    public interface IJEntity
    {
        JObject Properties { get; }
    }
}
