using Microsoft.AspNetCore.Routing;
using System;
using System.Collections.Generic;
using System.Text;

namespace SeedModules.AngularUI.Models
{
    public class RouteViewReference
    {
        public string Route { get; set; }

        public IEnumerable<string> References { get; set; } = new HashSet<string>();
    }
}
