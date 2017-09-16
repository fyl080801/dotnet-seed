using Seed.Modules;
using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.AspNetCore.Routing;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Builder.Internal;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Mvc.Internal;

namespace Seed.Mvc
{
    public class ModuleLauncherRouteBuilder : IModuleLauncherRouteBuilder
    {
        readonly IServiceProvider _serviceProvider;

        public ModuleLauncherRouteBuilder(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        public IRouteBuilder Build()
        {
            IApplicationBuilder appBuilder = new ApplicationBuilder(_serviceProvider);

            var routeBuilder = new RouteBuilder(appBuilder)
            {
                DefaultHandler = _serviceProvider.GetRequiredService<MvcRouteHandler>()
            };

            return routeBuilder;
        }

        public void Configure(IRouteBuilder builder)
        {
            var inlineConstraintResolver = _serviceProvider.GetService<IInlineConstraintResolver>();

            builder.Routes.Add(new Route(
                builder.DefaultHandler,
                "Default",
                "{area:exists}/{controller}/{action}/{id?}",
                null,
                null,
                null,
                inlineConstraintResolver)
            );

            builder.Routes.Insert(0, AttributeRouting.CreateAttributeMegaRoute(_serviceProvider));
        }
    }
}
