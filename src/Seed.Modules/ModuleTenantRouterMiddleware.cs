using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Builder.Internal;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Seed.Environment.Engine.Builders;
using Seed.Environment.Engine.Models;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Seed.Modules
{
    public class ModuleTenantRouterMiddleware
    {
        private readonly IFeatureCollection _features;
        private readonly RequestDelegate _next;
        private readonly ILogger _logger;
        private readonly ConcurrentDictionary<string, SemaphoreSlim> _semaphores = new ConcurrentDictionary<string, SemaphoreSlim>();

        public ModuleTenantRouterMiddleware(
            IFeatureCollection features,
            RequestDelegate next,
            ILogger<ModuleTenantRouterMiddleware> logger)
        {
            _features = features;
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

            if (!String.IsNullOrEmpty(engineContext.Settings.RequestUrlPrefix))
            {
                PathString prefix = "/" + engineContext.Settings.RequestUrlPrefix;
                httpContext.Request.PathBase += prefix;
                httpContext.Request.Path.StartsWithSegments(prefix, StringComparison.OrdinalIgnoreCase, out PathString remainingPath);
                httpContext.Request.Path = remainingPath;
            }

            if (engineContext.Pipeline == null)
            {
                var semaphore = _semaphores.GetOrAdd(engineContext.Settings.Name, (name) => new SemaphoreSlim(1));

                await semaphore.WaitAsync();

                try
                {
                    if (engineContext.Pipeline == null)
                    {
                        engineContext.Pipeline = BuildTenantPipeline(engineContext.ServiceProvider, httpContext.RequestServices);
                    }
                }

                finally
                {
                    semaphore.Release();
                    _semaphores.TryRemove(engineContext.Settings.Name, out semaphore);
                }
            }

            await engineContext.Pipeline.Invoke(httpContext);
        }

        private RequestDelegate BuildTenantPipeline(IServiceProvider rootServiceProvider, IServiceProvider scopeServiceProvider)
        {
            var appBuilder = new ApplicationBuilder(rootServiceProvider, _features);

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
