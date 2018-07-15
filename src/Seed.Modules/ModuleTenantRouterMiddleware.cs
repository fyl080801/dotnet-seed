using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Builder.Internal;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Seed.Environment.Engine.Builders;
using Seed.Environment.Engine.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Seed.Modules
{
    public class ModuleTenantRouterMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger _logger;
        private readonly Dictionary<string, RequestDelegate> _pipelines = new Dictionary<string, RequestDelegate>();

        public ModuleTenantRouterMiddleware(
            RequestDelegate next,
            ILogger<ModuleTenantRouterMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task Invoke(HttpContext httpContext)
        {
            if (_logger.IsEnabled(LogLevel.Information))
            {
                _logger.LogInformation("Begin Routing Request");
            }

            var engineContext = httpContext.Features.Get<EngineContext>();

            if (!string.IsNullOrEmpty(engineContext.Settings.RequestUrlPrefix))
            {
                httpContext.Request.PathBase += ("/" + engineContext.Settings.RequestUrlPrefix);
                httpContext.Request.Path = httpContext.Request.Path.ToString().Substring(httpContext.Request.PathBase.Value.Length);
            }

            var rebuildPipeline = httpContext.Items["BuildPipeline"] != null;
            if (rebuildPipeline && _pipelines.ContainsKey(engineContext.Settings.Name))
            {
                _pipelines.Remove(engineContext.Settings.Name);
            }

            if (!_pipelines.TryGetValue(engineContext.Settings.Name, out RequestDelegate pipeline))
            {
                lock (_pipelines)
                {
                    if (!_pipelines.TryGetValue(engineContext.Settings.Name, out pipeline))
                    {
                        pipeline = BuildTenantPipeline(engineContext.ServiceProvider, httpContext.RequestServices);

                        if (engineContext.Settings.State == TenantStates.Running)
                        {
                            _pipelines.Add(engineContext.Settings.Name, pipeline);
                        }
                    }
                }
            }

            await pipeline.Invoke(httpContext);
        }

        public RequestDelegate BuildTenantPipeline(IServiceProvider rootServiceProvider, IServiceProvider scopeServiceProvider)
        {
            var appBuilder = new ApplicationBuilder(rootServiceProvider);

            var startupFilters = appBuilder.ApplicationServices.GetService<IEnumerable<IStartupFilter>>();

            Action<IApplicationBuilder> configure = builder =>
            {
                ConfigureTenantPipeline(builder, scopeServiceProvider);
            };

            foreach (var filter in startupFilters.Reverse())
            {
                configure = filter.Configure(configure);
            }

            configure(appBuilder);

            var pipeline = appBuilder.Build();

            return pipeline;
        }

        private void ConfigureTenantPipeline(IApplicationBuilder appBuilder, IServiceProvider scopeServiceProvider)
        {
            var startups = appBuilder.ApplicationServices.GetServices<IStartup>();

            startups = startups.OrderBy(s => s.Order);

            var tenantRouteBuilder = appBuilder.ApplicationServices.GetService<IModuleTenantRouteBuilder>();
            var routeBuilder = tenantRouteBuilder.Build(appBuilder);

            foreach (var startup in startups)
            {
                startup.Configure(appBuilder, routeBuilder, scopeServiceProvider);
            }

            tenantRouteBuilder.Configure(routeBuilder);

            var router = routeBuilder.Build();

            appBuilder.UseRouter(router);
        }
    }
}
