using System;
using System.Collections.Generic;
using System.Text;
using Newtonsoft.Json.Linq;

namespace Seed.Data
{
    public abstract class EntityBase : IEntity
    {
        public int Id
        {
            get { return Properties["Id"].ToObject<int>(); }
            set { Properties["Id"] = value; }
        }

        public JObject Properties { get; set; } = new JObject();
    }
}
