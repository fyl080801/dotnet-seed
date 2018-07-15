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
            return new RouteBuilder(appBuilder) { };
        }

        public void Configure(IRouteBuilder builder)
        {
        }
    }
}
