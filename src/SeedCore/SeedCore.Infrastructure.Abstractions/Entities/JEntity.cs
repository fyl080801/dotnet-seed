using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json.Linq;

namespace SeedCore.Infrastructure.Entities
{
    public class JEntity : IJEntity
    {
        [NotMapped]
        public virtual JObject Properties { get; set; } = new JObject();
    }
}
