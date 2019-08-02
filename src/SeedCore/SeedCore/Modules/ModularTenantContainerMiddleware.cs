using System.Collections.Concurrent;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Net.Http.Headers;
using SeedCore.DeferredTasks;
using SeedCore.Shell;
using SeedCore.Shell.Models;

namespace SeedCore.Modules
{
    /// <summary>
    /// 为当前租户替换services作用域
    /// </summary>
    public class ModularTenantContainerMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly IShellHost _shellHost;
        private readonly IRunningShellTable _runningShellTable;
        private readonly ConcurrentDictionary<string, SemaphoreSlim> _semaphores = new ConcurrentDictionary<string, SemaphoreSlim>();

        public ModularTenantContainerMiddleware(
            RequestDelegate next,
            IShellHost shellHost,
            IRunningShellTable runningShellTable)
        {
            _next = next;
            _shellHost = shellHost;
            _runningShellTable = runningShellTable;
        }

        public async Task Invoke(HttpContext httpContext)
        {
            // 先确定上下文是否已经初始化
            await _shellHost.InitializeAsync();

            var shellSettings = _runningShellTable.Match(httpContext);

            // 如果租户已经初始化，只处理下一个有效的租户
            if (shellSettings != null)
            {
                if (shellSettings.State == TenantState.Initializing)
                {
                    httpContext.Response.Headers.Add(HeaderNames.RetryAfter, "10");
                    httpContext.Response.StatusCode = StatusCodes.Status503ServiceUnavailable;
                    await httpContext.Response.WriteAsync("租户请求当前正初始化");
                    return;
                }

                var hasPendingTasks = false;

                // We need to get a scope and the ShellContext that created it
                var (scope, shellContext) = await _shellHost.GetScopeAndContextAsync(shellSettings);

                using (scope)
                {
                    // Register the shell context as a custom feature
                    httpContext.Features.Set(shellContext);

                    if (!shellContext.IsActivated)
                    {
                        var semaphore = _semaphores.GetOrAdd(shellSettings.Name, (name) => new SemaphoreSlim(1));

                        await semaphore.WaitAsync();

                        try
                        {
                            // 租户是激活的
                            if (!shellContext.IsActivated)
                            {
                                using (var activatingScope = await _shellHost.GetScopeAsync(shellSettings))
                                {
                                    var tenantEvents = activatingScope.ServiceProvider.GetServices<IModularTenantEvents>();

                                    foreach (var tenantEvent in tenantEvents)
                                    {
                                        await tenantEvent.ActivatingAsync();
                                    }

                                    foreach (var tenantEvent in tenantEvents.Reverse())
                                    {
                                        await tenantEvent.ActivatedAsync();
                                    }
                                }

                                shellContext.IsActivated = true;
                            }
                        }
                        finally
                        {
                            semaphore.Release();
                            _semaphores.TryRemove(shellSettings.Name, out semaphore);
                        }
                    }

                    await _next.Invoke(httpContext);
                    var deferredTaskEngine = scope.ServiceProvider.GetService<IDeferredTaskEngine>();
                    hasPendingTasks = deferredTaskEngine?.HasPendingTasks ?? false;
                }

                // 只要有待处理的进程，就创建一个新的作用域
                if (hasPendingTasks)
                {
                    using (var pendingScope = await _shellHost.GetScopeAsync(shellSettings))
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