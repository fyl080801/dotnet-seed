using System;
using System.Collections.Generic;
using System.Text;

namespace SeedModules.Acc.Domain
{
    public class Area
    {
        public string Code { get; set; }

        public string Name { get; set; }

        public double LocationX { get; set; }

        public double LocationY { get; set; }

        public double Zoom { get; set; }
    }
}
