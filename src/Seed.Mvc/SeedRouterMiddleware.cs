using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Builder.Internal;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Internal;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.DependencyInjection;
using Seed.Environment.Engine;
using Seed.Mvc.Routes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Seed.Mvc
{
    public class SeedRouterMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly Dictionary<string, RequestDelegate> _pipelines = new Dictionary<string, RequestDelegate>();

        public SeedRouterMiddleware(
            RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext httpContext)
        {
            var variables = (EngineVariables)httpContext.Features[typeof(EngineVariables)];

            var rebuildPipeline = httpContext.Items["BuildPipeline"] != null;
            if (rebuildPipeline && _pipelines.ContainsKey(variables.Name))
            {
                _pipelines.Remove(variables.Name);
            }

            RequestDelegate pipeline;

            if (!_pipelines.TryGetValue(variables.Name, out pipeline))
            {
                lock (_pipelines)
                {
                    if (!_pipelines.TryGetValue(variables.Name, out pipeline))
                    {
                        pipeline = BuildPipeline(variables, httpContext.RequestServices);

                        if (variables.State == EngineStates.Running)
                        {
                            _pipelines.Add(variables.Name, pipeline);
                        }
                    }
                }
            }

            await pipeline.Invoke(httpContext);
        }
        
        public RequestDelegate BuildPipeline(EngineVariables variables, IServiceProvider serviceProvider)
        {
            var startups = serviceProvider.GetServices<Environment.Plugin.Modules.IStartup>();
            var inlineConstraintResolver = serviceProvider.GetService<IInlineConstraintResolver>();

            IApplicationBuilder appBuilder = new ApplicationBuilder(serviceProvider);

            string routePrefix = "";
            if (!string.IsNullOrWhiteSpace(variables.RequestUrlPrefix))
            {
                routePrefix = variables.RequestUrlPrefix + "/";
            }

            var routeBuilder = new RouteBuilder(appBuilder)
            {
                DefaultHandler = serviceProvider.GetRequiredService<MvcRouteHandler>()
            };

            var prefixedRouteBuilder = new PrefixedRouteBuilder(routePrefix, routeBuilder, inlineConstraintResolver);
            
            foreach (var startup in startups)
            {
                startup.Configure(appBuilder, prefixedRouteBuilder, serviceProvider);
            }
            
            prefixedRouteBuilder.Routes.Add(new Route(
                prefixedRouteBuilder.DefaultHandler,
                "Default",
                "{area:exists}/{controller}/{action}/{id?}",
                null,
                null,
                null,
                inlineConstraintResolver)
            );

            //var siteService = routeBuilder.ServiceProvider.GetService<ISiteService>();

            //// ISiteService might not be registered during Setup
            //if (siteService != null)
            //{
            //    // Add home page route
            //    routeBuilder.Routes.Add(new HomePageRoute(shellSettings.RequestUrlPrefix, siteService, routeBuilder, inlineConstraintResolver));
            //}

            var router = prefixedRouteBuilder.Build();

            appBuilder.UseRouter(router);

            var pipeline = appBuilder.Build();

            return pipeline;
        }
    }
}
