using System;
using System.Collections.Generic;
using System.Text;

namespace SeedModules.Acc.Domain
{
    /// <summary>
    /// 舱室
    /// </summary>
    public class Cabin
    {
        public string Code { get; set; }

        public string Name { get; set; }

        public ICollection<Cabin> Children { get; set; }
    }
}
