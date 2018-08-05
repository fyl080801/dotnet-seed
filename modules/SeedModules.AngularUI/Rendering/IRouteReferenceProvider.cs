using SeedModules.AngularUI.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace SeedModules.AngularUI.Rendering
{
    public interface IRouteReferenceProvider
    {
        IEnumerable<RouteViewReference> GetViewReferences();
    }
}
