using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Seed.Environment.Engine;
using Seed.Modules.Extensions;
using System;
using System.Threading.Tasks;

namespace Seed.Modules
{
    /// <summary>
    /// 租户机制中间件
    /// </summary>
    /// <remarks>
    /// 根据http请求执行多租户引擎下对应的租户上下文
    /// </remarks>
    public class ModuleTenantContainerMiddleware
    {
        readonly RequestDelegate _next;
        readonly IEngineHost _engineHost;
        readonly IRunningEngineTable _runningEngineTable;

        public ModuleTenantContainerMiddleware(
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

                // 先把默认的 ServiceProvider 存起来
                var existingRequestServices = httpContext.RequestServices;
                var scope = engineContext.EntryServiceScope();

                try
                {
                    // 将 Engine 的 ServiceProvider 作为请求的 RequestServices
                    httpContext.RequestServices = scope.ServiceProvider;

                    if (!engineContext.IsActivated)
                    {
                        lock (engineContext)
                        {
                            if (!engineContext.IsActivated)
                            {
                                var tenantEvents = scope.ServiceProvider.GetServices<IModuleTenantEvents>();

                                foreach (var tenantEvent in tenantEvents)
                                {
                                    tenantEvent.ActivatingAsync().Wait();
                                }

                                httpContext.Items["BuildPipeline"] = true;
                                engineContext.IsActivated = true;

                                foreach (var tenantEvent in tenantEvents)
                                {
                                    tenantEvent.ActivatedAsync().Wait();
                                }
                            }
                        }
                    }

                    engineContext.RequestStarted();
                    await _next.Invoke(httpContext);
                }
                finally
                {
                    // 释放 ServiceProvider 后还原原有的 ServiceProvider
                    (httpContext.RequestServices as IDisposable)?.Dispose();
                    engineContext.RequestEnded();
                    httpContext.RequestServices = existingRequestServices;
                }
            }
        }
    }
}
