using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;
using Newtonsoft.Json.Linq;

namespace Seed.Data
{
    public class JEntity : IJEntity
    {
        [NotMapped]
        public virtual JObject Properties { get; set; } = new JObject();
    }
}
