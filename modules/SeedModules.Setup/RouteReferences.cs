using System.Collections.Generic;
using SeedModules.AngularUI.Models;
using SeedModules.AngularUI.Rendering;

namespace SeedModules.Setup
{
    public class RouteReferences : IRouteReferenceProvider
    {
        public IEnumerable<RouteViewReference> GetViewReferences()
        {
            return new[] {
                new RouteViewReference()
             };
        }
    }
}