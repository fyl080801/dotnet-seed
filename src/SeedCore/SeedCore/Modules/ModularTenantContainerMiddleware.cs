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
    /// This middleware replaces the default service provider by the one for the current tenant
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
            // Ensure all ShellContext are loaded and available.
            await _shellHost.InitializeAsync();

            var shellSettings = _runningShellTable.Match(httpContext);

            // We only serve the next request if the tenant has been resolved.
            if (shellSettings != null)
            {
                if (shellSettings.State == TenantState.Initializing)
                {
                    httpContext.Response.Headers.Add(HeaderNames.RetryAfter, "10");
                    httpContext.Response.StatusCode = StatusCodes.Status503ServiceUnavailable;
                    await httpContext.Response.WriteAsync("The requested tenant is currently initializing.");
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
                            // The tenant gets activated here
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

                // Create a new scope only if there are pending tasks
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