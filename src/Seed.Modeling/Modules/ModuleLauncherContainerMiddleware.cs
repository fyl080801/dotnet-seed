using Microsoft.AspNetCore.Http;
using Seed.Environment.Engine;
using Seed.Modules.Extensions;
using System;
using System.Threading.Tasks;

namespace Seed.Modules
{
    public class ModuleLauncherContainerMiddleware
    {
        readonly RequestDelegate _next;
        readonly IEngineHost _engineHost;
        readonly IRunningEngineTable _runningEngineTable;

        public ModuleLauncherContainerMiddleware(
           RequestDelegate next,
           IEngineHost engineHost,
           IRunningEngineTable runningEngineTable)
        {
            _next = next;
            _engineHost = engineHost;
            _runningEngineTable = runningEngineTable;
        }

        public async Task Invoke(HttpContext httpContext)
        {
            _engineHost.Initialize();

            var engineSetting = _runningEngineTable.Match(httpContext);

            httpContext.Features.Set(engineSetting);

            if (engineSetting != null)
            {
                var engineContext = _engineHost.GetOrCreateContext(engineSetting);

                var existingRequestServices = httpContext.RequestServices;
                var scope = engineContext.CreateServiceScope();

                try
                {
                    httpContext.RequestServices = scope.ServiceProvider;

                    if (!engineContext.IsActivated)
                    {
                        lock (engineContext)
                        {
                            if (!engineContext.IsActivated)
                            {
                                //var tenantEvents = scope.ServiceProvider
                                //    .GetServices<IModularTenantEvents>();

                                //foreach (var tenantEvent in tenantEvents)
                                //{
                                //    tenantEvent.ActivatingAsync().Wait();
                                //}

                                httpContext.Items["BuildPipeline"] = true;
                                engineContext.IsActivated = true;

                                //foreach (var tenantEvent in tenantEvents)
                                //{
                                //    tenantEvent.ActivatedAsync().Wait();
                                //}
                            }
                        }
                    }

                    engineContext.RequestStarted();
                    await _next.Invoke(httpContext);
                }
                finally
                {
                    (httpContext.RequestServices as IDisposable)?.Dispose();
                    engineContext.RequestEnded();
                    httpContext.RequestServices = existingRequestServices;
                }
            }
        }
    }
}
