using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Net.Http.Headers;
using Seed.Environment.Engine;
using Seed.Modules.DeferredTasks;
using Seed.Modules.Extensions;
using System;
using System.Collections.Concurrent;
using System.Linq;
using System.Threading;
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
        private readonly RequestDelegate _next;
        private readonly IEngineHost _engineHost;
        private readonly IRunningEngineTable _runningEngineTable;
        private readonly ConcurrentDictionary<string, SemaphoreSlim> _semaphores = new ConcurrentDictionary<string, SemaphoreSlim>();

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
            await _engineHost.InitializeAsync();

            var engineSettings = _runningEngineTable.Match(httpContext);

            if (engineSettings != null)
            {
                if (engineSettings.State == Environment.Engine.Models.TenantStates.Initializing)
                {
                    httpContext.Response.Headers.Add(HeaderNames.RetryAfter, "10");
                    httpContext.Response.StatusCode = StatusCodes.Status503ServiceUnavailable;
                    await httpContext.Response.WriteAsync("The requested tenant is currently initializing.");
                    return;
                }

                var hasPendingTasks = false;

                var (scope, engineContext) = await _engineHost.GetScopeAndContextAsync(engineSettings);

                using (scope)
                {
                    httpContext.Features.Set(engineContext);

                    if (!engineContext.IsActivated)
                    {
                        var semaphore = _semaphores.GetOrAdd(engineSettings.Name, (name) => new SemaphoreSlim(1));

                        await semaphore.WaitAsync();

                        try
                        {
                            if (!engineContext.IsActivated)
                            {
                                using (var activatingScope = await _engineHost.GetScopeAsync(engineSettings))
                                {
                                    var tenantEvents = activatingScope.ServiceProvider.GetServices<IModuleTenantEvents>();

                                    foreach (var tenantEvent in tenantEvents)
                                    {
                                        await tenantEvent.ActivatingAsync();
                                    }

                                    foreach (var tenantEvent in tenantEvents.Reverse())
                                    {
                                        await tenantEvent.ActivatedAsync();
                                    }
                                }

                                engineContext.IsActivated = true;
                            }
                        }
                        finally
                        {
                            semaphore.Release();
                            _semaphores.TryRemove(engineSettings.Name, out semaphore);
                        }
                    }

                    await _next.Invoke(httpContext);
                    var deferredTaskEngine = scope.ServiceProvider.GetService<IDeferredTaskEngine>();
                    hasPendingTasks = deferredTaskEngine?.HasPendingTasks ?? false;
                }

                if (hasPendingTasks)
                {
                    using (var pendingScope = await _engineHost.GetScopeAsync(engineSettings))
                    {
                        if (pendingScope != null)
                        {
                            var deferredTaskEngine = pendingScope.ServiceProvider.GetService<IDeferredTaskEngine>();
                            var context = new DeferredTaskContext(pendingScope.ServiceProvider);
                            await deferredTaskEngine.ExecuteTasksAsync(context);
                        }
                    }
                }
            }
        }
    }
}
