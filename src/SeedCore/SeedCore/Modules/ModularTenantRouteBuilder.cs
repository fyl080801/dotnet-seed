using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Routing;

namespace SeedCore.Modules
{
    public class ModularTenantRouteBuilder : IModularTenantRouteBuilder
    {
        public ModularTenantRouteBuilder()
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