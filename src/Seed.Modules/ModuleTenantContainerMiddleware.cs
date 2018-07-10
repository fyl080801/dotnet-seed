using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
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
        private readonly IEngineHost _host;
        private readonly IRunningEngineTable _runningEngineTable;
        private readonly ConcurrentDictionary<string, SemaphoreSlim> _semaphores = new ConcurrentDictionary<string, SemaphoreSlim>();

        public ModuleTenantContainerMiddleware(
            RequestDelegate next,
            IEngineHost host,
            IRunningEngineTable runningEngineTable)
        {
            _next = next;
            _host = host;
            _runningEngineTable = runningEngineTable;
        }

        public async Task Invoke(HttpContext httpContext)
        {
            _host.Initialize();

            var engineSettings = _runningEngineTable.Match(httpContext);

            if (engineSettings != null)
            {
                var engineContext = _host.GetOrCreateEngineContext(engineSettings);

                var hasPendingTasks = false;
                using (var scope = engineContext.EnterServiceScope())
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
                                using (var activatingScope = engineContext.EnterServiceScope())
                                {

                                    var tenantEvents = activatingScope.ServiceProvider.GetServices<IModuleTenantEvents>();

                                    foreach (var tenantEvent in tenantEvents)
                                    {
                                        await tenantEvent.ActivatingAsync();
                                    }

                                    httpContext.Items["BuildPipeline"] = true;

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
                    engineContext = _host.GetOrCreateEngineContext(engineSettings);

                    using (var scope = engineContext.EnterServiceScope())
                    {
                        var deferredTaskEngine = scope.ServiceProvider.GetService<IDeferredTaskEngine>();
                        var context = new DeferredTaskContext(scope.ServiceProvider);
                        await deferredTaskEngine.ExecuteTasksAsync(context);
                    }
                }
            }
        }
    }
}
