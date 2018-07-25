using System;
using System.Collections.Generic;
using System.Text;

namespace SeedModules.Acc.Domain
{
    public class Location
    {
        public ICollection<Area> Areas { get; set; }
    }
}
