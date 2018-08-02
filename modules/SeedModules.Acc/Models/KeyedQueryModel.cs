using Seed.Mvc.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace SeedModules.Acc.Models
{
    public class KeyedQueryModel : ListQueryModel
    {
        public string Keyword { get; set; }
    }
}
