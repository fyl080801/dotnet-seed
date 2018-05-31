using System.Collections.Generic;

namespace SeedModules.AngularUI.Rendering
{
    public interface IRouteReferenceProvider
    {
        IEnumerable<string> GetReferences(string route);
    }
}