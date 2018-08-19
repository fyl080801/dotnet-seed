using Microsoft.AspNet.OData.Extensions;
using Microsoft.AspNet.OData.Routing.Conventions;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Routing;
using Microsoft.OData;
using System;
using System.Collections.Generic;
using System.Text;

namespace SeedModules.PageBuilder.Extensions
{
    public static class ApplicationBuilderExtensions
    {
        public static IApplicationBuilder UseDynamicBusiness(this IApplicationBuilder app, IRouteBuilder routes, IServiceProvider serviceProvider)
        {
            routes.Count().Filter().OrderBy().Expand().Select().MaxTop(null);
            routes.MapODataServiceRoute("odata", "odata", cb =>
            {
                
                // cb.AddService<IEnumerable<IODataRoutingConvention>>(ServiceLifetime.Singleton, sp => ODataRoutingConventions.CreateDefaultWithAttributeRouting("odata", routes));
            });
            routes.EnableDependencyInjection();

            return app;
        }
    }
}
