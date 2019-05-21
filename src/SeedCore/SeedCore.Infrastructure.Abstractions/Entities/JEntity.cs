using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json.Linq;

namespace SeedCore.Data
{
    public class JEntity : IJEntity
    {
        [NotMapped]
        public virtual JObject Properties { get; set; } = new JObject();
    }
}
