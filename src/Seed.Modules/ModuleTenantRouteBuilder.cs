using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Routing;

namespace Seed.Modules
{
    public class ModuleTenantRouteBuilder : IModuleTenantRouteBuilder
    {
        public ModuleTenantRouteBuilder()
        {
        }

        public IRouteBuilder Build(IApplicationBuilder appBuilder)
        {
            var routeBuilder = new RouteBuilder(appBuilder)
            {
            };

            return routeBuilder;
        }

        public void Configure(IRouteBuilder builder)
        {
        }
    }
}
