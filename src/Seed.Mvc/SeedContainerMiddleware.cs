using Microsoft.AspNetCore.Http;
using Seed.Environment.Engine;
using Seed.Hosting;
using Seed.Mvc.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Seed.Mvc
{
    public class SeedContainerMiddleware
    {
        readonly RequestDelegate _next;
        readonly IHost _host;
        readonly IEngineRunningTable _engineRunningTable;

        public SeedContainerMiddleware(
            RequestDelegate next,
            IHost host,
            IEngineRunningTable engineRunningTable)
        {
            _next = next;
            _host = host;
            _engineRunningTable = engineRunningTable;
        }

        public async Task Invoke(HttpContext httpContext)
        {
            _host.Initialize();

            var settings = _engineRunningTable.Match(httpContext);

            httpContext.Features[typeof(EngineVariables)] = settings;

            if (settings != null)
            {
                EngineContext context = _host.GetOrCreateEngineContext(settings);
                using (var scope = context.CreateServiceScope())
                {
                    httpContext.RequestServices = scope.ServiceProvider;
                    if (!context.Activated)
                    {
                        lock (context)
                        {
                            if (!context.Activated)
                            {
                                httpContext.Items["PipelineCreated"] = true;
                                context.Activated = true;
                            }
                        }
                    }
                }
                await _next.Invoke(httpContext);
            }
        }
    }
}
