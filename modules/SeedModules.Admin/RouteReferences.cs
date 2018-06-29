using System.Collections.Generic;
using SeedModules.AngularUI.Models;
using SeedModules.AngularUI.Rendering;

namespace SeedModules.Admin
{
    public class RouteReferences : IRouteReferenceProvider
    {
        public IEnumerable<RouteViewReference> GetViewReferences()
        {
            return new[] {
                new RouteViewReference(
                    "SeedModules.Admin/Home/Index",
                    "rcss!SeedModules.Admin/less/seed-admin.css",
                    "SeedModules.Admin/modules/admin/module"),
                new RouteViewReference(
                    "SeedModules.Admin/Home/Login",
                    "rcss!SeedModules.Admin/less/seed-admin.css",
                    "SeedModules.Admin/modules/login/module")
            };
        }
    }
}