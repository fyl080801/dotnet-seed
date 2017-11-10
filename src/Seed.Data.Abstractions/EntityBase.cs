using System;
using System.Collections.Generic;
using System.Text;
using Newtonsoft.Json.Linq;

namespace Seed.Data
{
    public abstract class EntityBase : IEntity
    {
        public JObject Properties { get; set; } = new JObject();
    }
}
