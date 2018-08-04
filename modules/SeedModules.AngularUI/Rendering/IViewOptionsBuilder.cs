using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using System.Threading.Tasks;

namespace SeedModules.AngularUI.Rendering
{
    public interface IViewOptionsBuilder
    {
        Task<string> Build(ControllerContext controllerContext, RouteData routeData);
    }
}