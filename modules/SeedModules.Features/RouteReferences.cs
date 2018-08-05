using SeedModules.AngularUI.Models;
using SeedModules.AngularUI.Rendering;
using System.Collections.Generic;

namespace SeedModules.Features
{
    public class RouteReferences : IRouteReferenceProvider
    {
        public IEnumerable<RouteViewReference> GetViewReferences()
        {
            return new[] {
                new RouteViewReference(
                    "SeedModules.Admin/Home/Index",
                    "SeedModules.Features/modules/module"),
            };
        }
    }
}