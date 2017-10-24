using Microsoft.AspNetCore.Mvc.Razor;
using System.Collections.Generic;

namespace Seed.Mvc.LocationExpanders
{
    public class DefaultViewLocationExpanderProvider : IViewLocationExpanderProvider
    {
        public int Priority => 0;

        public DefaultViewLocationExpanderProvider()
        {

        }

        public IEnumerable<string> ExpandViewLocations(ViewLocationExpanderContext context, IEnumerable<string> viewLocations)
        {
            return viewLocations;
        }

        public void PopulateValues(ViewLocationExpanderContext context)
        {

        }
    }
}
