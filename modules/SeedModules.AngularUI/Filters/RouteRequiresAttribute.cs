using System;
using System.Collections.Generic;
using System.Text;

namespace SeedModules.AngularUI.Filters
{
    [AttributeUsage(AttributeTargets.Method)]
    public class RouteRequiresAttribute : Attribute
    {
        public string[] Requires { get; private set; }

        public RouteRequiresAttribute(params string[] requires)
        {
            Requires = requires ?? new string[0];
        }
    }
}
