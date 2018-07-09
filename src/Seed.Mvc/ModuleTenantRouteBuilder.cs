using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Mvc.Internal;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.DependencyInjection;
using Seed.Modules;

namespace Seed.Mvc
{
    public class ModuleTenantRouteBuilder : IModuleTenantRouteBuilder
    {
        public IRouteBuilder Build(IApplicationBuilder appBuilder)
        {
            var routeBuilder = new RouteBuilder(appBuilder)
            {
                DefaultHandler = appBuilder.ApplicationServices.GetRequiredService<MvcRouteHandler>()
            };

            return routeBuilder;
        }

        public void Configure(IRouteBuilder builder)
        {
            builder.Routes.Add(new Route(
                builder.DefaultHandler,
                "Default",
                "{area:exists}/{controller}/{action}/{id?}",
                null,
                null,
                null,
                builder.ServiceProvider.GetService<IInlineConstraintResolver>())
            );

            builder.Routes.Insert(0, AttributeRouting.CreateAttributeMegaRoute(builder.ServiceProvider));
        }
    }
}
