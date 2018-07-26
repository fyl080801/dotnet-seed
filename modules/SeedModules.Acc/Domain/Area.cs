using System;
using System.Collections.Generic;
using System.Text;

namespace SeedModules.Acc.Domain
{
    public class Area
    {
        public string Code { get; set; }

        public string Name { get; set; }

        public double CenterLng { get; set; }

        public double CenterLat { get; set; }

        public double Zoom { get; set; }
    }
}
