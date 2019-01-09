using System.Collections.Generic;
using SeedModules.AngularUI.Models;
using SeedModules.AngularUI.Rendering;

namespace SeedModules.OpenId
{
    public class RouteReferences : IRouteReferenceProvider
    {
        public IEnumerable<RouteViewReference> GetViewReferences()
        {
            return new[] {
                new RouteViewReference(
                    "SeedModules.Admin/Home/Index",
                    "SeedModules.OpenId/modules/manage/module"),
            };
        }
    }
}