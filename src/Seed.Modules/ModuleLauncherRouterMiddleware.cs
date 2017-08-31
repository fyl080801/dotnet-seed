using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Builder.Internal;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Seed.Environment.Abstractions.Engine;
using Seed.Modules.Abstractions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Seed.Modules
{
    public class ModuleLauncherRouterMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly Dictionary<string, RequestDelegate> _pipelines = new Dictionary<string, RequestDelegate>();

        public ModuleLauncherRouterMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext httpContext)
        {
            var engineSettings = httpContext.Features.Get<EngineSettings>();

            if (!string.IsNullOrEmpty(engineSettings.RequestUrlPrefix))
            {
                httpContext.Request.PathBase += ("/" + engineSettings.RequestUrlPrefix);
                httpContext.Request.Path = httpContext.Request.Path.ToString().Substring(httpContext.Request.PathBase.Value.Length);
            }

            var rebuildPipeline = httpContext.Items["BuildPipeline"] != null;
            if (rebuildPipeline && _pipelines.ContainsKey(engineSettings.Name))
            {
                _pipelines.Remove(engineSettings.Name);
            }

            if (!_pipelines.TryGetValue(engineSettings.Name, out RequestDelegate pipeline))
            {
                lock (_pipelines)
                {
                    if (!_pipelines.TryGetValue(engineSettings.Name, out pipeline))
                    {
                        pipeline = BuildLauncherPipeline(engineSettings, httpContext.RequestServices);

                        if (engineSettings.State == LauncherStates.Running)
                        {
                            _pipelines.Add(engineSettings.Name, pipeline);
                        }
                    }
                }
            }

            await pipeline.Invoke(httpContext);
        }

        public RequestDelegate BuildLauncherPipeline(EngineSettings settings, IServiceProvider serviceProvider)
        {
            var startups = serviceProvider.GetServices<IStartup>();

            startups = startups.OrderBy(s => s.Order);

            var launcherRouteBuilder = serviceProvider.GetService<IModuleLauncherRouteBuilder>();

            var appBuilder = new ApplicationBuilder(serviceProvider);
            var routeBuilder = launcherRouteBuilder.Build();

            foreach (var startup in startups)
            {
                startup.Configure(appBuilder, routeBuilder, serviceProvider);
            }

            launcherRouteBuilder.Configure(routeBuilder);

            var router = routeBuilder.Build();

            appBuilder.UseRouter(router);

            var pipeline = appBuilder.Build();

            return pipeline;
        }
    }
}
