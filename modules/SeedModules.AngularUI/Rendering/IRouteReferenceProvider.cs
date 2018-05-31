using System.Collections.Generic;
using System.Threading.Tasks;
using SeedModules.AngularUI.Models;

namespace SeedModules.AngularUI.Rendering
{
    public interface IRouteReferenceProvider
    {
        IEnumerable<RouteViewReference> GetViewReferences();
    }
}