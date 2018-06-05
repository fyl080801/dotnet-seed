using System;
using System.Collections.Generic;
using System.Text;
using Newtonsoft.Json.Linq;

namespace Seed.Data
{
    public class JEntity : IJEntity
    {
        public virtual JObject Properties { get; set; } = new JObject();
    }
}
