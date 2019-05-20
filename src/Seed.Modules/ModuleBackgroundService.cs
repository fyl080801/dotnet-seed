using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Primitives;
using Seed.Environment.BackgroundTasks;
using Seed.Environment.Engine;
using Seed.Environment.Engine.Builders;
using Seed.Environment.Engine.Models;

namespace Seed.Modules
{
    internal class ModuleBackgroundService : BackgroundService
    {
        private static TimeSpan PollingTime = TimeSpan.FromMinutes(1);
        private static TimeSpan MinIdleTime = TimeSpan.FromSeconds(10);

        private readonly ConcurrentDictionary<string, BackgroundTaskScheduler> _schedulers =
            new ConcurrentDictionary<string, BackgroundTaskScheduler>();

        private readonly ConcurrentDictionary<string, IChangeToken> _changeTokens =
            new ConcurrentDictionary<string, IChangeToken>();

        private readonly IEngineHost _engineHost;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public ModuleBackgroundService(
            IEngineHost engineHost,
            IHttpContextAccessor httpContextAccessor,
            ILogger<ModuleBackgroundService> logger)
        {
            _engineHost = engineHost;
            _httpContextAccessor = httpContextAccessor;
            Logger = logger;
        }

        public ILogger Logger { get; set; }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            stoppingToken.Register(() =>
            {
                Logger.LogDebug("'{ServiceName}' is stopping.", nameof(ModuleBackgroundService));
            });

            try
            {
                while (GetRunningEngines().Count() < 1)
                {
                    await Task.Delay(MinIdleTime, stoppingToken);
                }

                var previousEngines = Enumerable.Empty<EngineContext>();

                while (!stoppingToken.IsCancellationRequested)
                {
                    var runningEngines = GetRunningEngines();
                    await UpdateAsync(previousEngines, runningEngines, stoppingToken);
                    previousEngines = runningEngines;

                    var pollingDelay = Task.Delay(PollingTime, stoppingToken);

                    await RunAsync(runningEngines, stoppingToken);
                    await WaitAsync(pollingDelay, stoppingToken);
                }
            }

            catch (TaskCanceledException) { }

            catch (Exception e)
            {
                Logger.LogError(e, "Error while executing '{ServiceName}', the service is stopping.", nameof(ModuleBackgroundService));
            }
        }

        private async Task RunAsync(IEnumerable<EngineContext> runningEngines, CancellationToken stoppingToken)
        {
            await GetEnginesToRun(runningEngines).ForEachAsync(async engine =>
            {
                var tenant = engine.Settings.Name;

                var schedulers = GetSchedulersToRun(tenant);

                _httpContextAccessor.HttpContext = engine.CreateHttpContext();

                foreach (var scheduler in schedulers)
                {
                    if (stoppingToken.IsCancellationRequested)
                    {
                        break;
                    }

                    IServiceScope scope = null;
                    EngineContext context = null;

                    try
                    {
                        (scope, context) = await _engineHost.GetScopeAndContextAsync(engine.Settings);
                    }

                    catch (Exception e)
                    {
                        Logger.LogError(e, "Can't resolve a scope on tenant '{TenantName}'.", tenant);
                        return;
                    }

                    using (scope)
                    {
                        if (scope == null || context.Pipeline == null)
                        {
                            break;
                        }

                        var taskName = scheduler.Name;

                        var task = scope.ServiceProvider.GetServices<IBackgroundTask>().GetTaskByName(taskName);

                        if (task == null)
                        {
                            continue;
                        }

                        try
                        {
                            Logger.LogInformation("Start processing background task '{TaskName}' on tenant '{TenantName}'.", taskName, tenant);

                            scheduler.Run();
                            await task.DoWorkAsync(scope.ServiceProvider, stoppingToken);

                            Logger.LogInformation("Finished processing background task '{TaskName}' on tenant '{TenantName}'.", taskName, tenant);
                        }

                        catch (Exception e)
                        {
                            Logger.LogError(e, "Error while processing background task '{TaskName}' on tenant '{TenantName}'.", taskName, tenant);
                        }
                    }
                }
            });
        }

        private async Task UpdateAsync(IEnumerable<EngineContext> previousEngines, IEnumerable<EngineContext> runningEngines, CancellationToken stoppingToken)
        {
            var referenceTime = DateTime.UtcNow;

            await GetEnginesToUpdate(previousEngines, runningEngines).ForEachAsync(async engine =>
            {
                var tenant = engine.Settings.Name;

                if (stoppingToken.IsCancellationRequested)
                {
                    return;
                }

                _httpContextAccessor.HttpContext = engine.CreateHttpContext();

                IServiceScope scope = null;
                EngineContext context = null;

                try
                {
                    (scope, context) = await _engineHost.GetScopeAndContextAsync(engine.Settings);
                }

                catch (Exception e)
                {
                    Logger.LogError(e, "Can't resolve a scope on tenant '{TenantName}'.", tenant);
                    return;
                }

                using (scope)
                {
                    if (scope == null || context.Pipeline == null)
                    {
                        return;
                    }

                    var tasks = scope.ServiceProvider.GetServices<IBackgroundTask>();

                    CleanSchedulers(tenant, tasks);

                    if (!tasks.Any())
                    {
                        return;
                    }

                    var settingsProvider = scope.ServiceProvider.GetService<IBackgroundTaskSettingsProvider>();

                    _changeTokens[tenant] = settingsProvider?.ChangeToken ?? NullChangeToken.Singleton;

                    foreach (var task in tasks)
                    {
                        var taskName = task.GetTaskName();

                        if (!_schedulers.TryGetValue(tenant + taskName, out BackgroundTaskScheduler scheduler))
                        {
                            _schedulers[tenant + taskName] = scheduler = new BackgroundTaskScheduler(tenant, taskName, referenceTime);
                        }

                        if (!scheduler.Released && scheduler.Updated)
                        {
                            continue;
                        }

                        BackgroundTaskSettings settings = null;

                        try
                        {
                            if (settingsProvider != null)
                            {
                                settings = await settingsProvider.GetSettingsAsync(task);
                            }
                        }

                        catch (Exception e)
                        {
                            Logger.LogError(e, "Error while updating settings of background task '{TaskName}' on tenant '{TenantName}'.", taskName, tenant);
                        }

                        settings = settings ?? task.GetDefaultSettings();

                        if (scheduler.Released || !scheduler.Settings.Schedule.Equals(settings.Schedule))
                        {
                            scheduler.ReferenceTime = referenceTime;
                        }

                        scheduler.Settings = settings;
                        scheduler.Released = false;
                        scheduler.Updated = true;
                    }
                }
            });
        }

        private async Task WaitAsync(Task pollingDelay, CancellationToken stoppingToken)
        {
            try
            {
                await Task.Delay(MinIdleTime, stoppingToken);
                await pollingDelay;
            }
            catch (OperationCanceledException)
            {
            }
        }

        private IEnumerable<EngineContext> GetRunningEngines()
        {
            return _engineHost.ListEngineContexts().Where(s => s.Settings.State == TenantStates.Running && s.Pipeline != null).ToArray();
        }

        private IEnumerable<EngineContext> GetEnginesToRun(IEnumerable<EngineContext> engines)
        {
            var tenantsToRun = _schedulers.Where(s => s.Value.CanRun()).Select(s => s.Value.Tenant).Distinct().ToArray();
            return engines.Where(s => tenantsToRun.Contains(s.Settings.Name)).ToArray();
        }

        private IEnumerable<EngineContext> GetEnginesToUpdate(IEnumerable<EngineContext> previousEngines, IEnumerable<EngineContext> runningEngines)
        {
            var released = previousEngines.Where(s => s.Released).Select(s => s.Settings.Name).ToArray();

            if (released.Any())
            {
                UpdateSchedulers(released, s => s.Released = true);
            }

            var changed = _changeTokens.Where(t => t.Value.HasChanged).Select(t => t.Key).ToArray();

            if (changed.Any())
            {
                UpdateSchedulers(changed, s => s.Updated = false);
            }

            var valid = previousEngines.Select(s => s.Settings.Name).Except(released).Except(changed);
            var tenantsToUpdate = runningEngines.Select(s => s.Settings.Name).Except(valid).ToArray();

            return runningEngines.Where(s => tenantsToUpdate.Contains(s.Settings.Name)).ToArray();
        }

        private IEnumerable<BackgroundTaskScheduler> GetSchedulersToRun(string tenant)
        {
            return _schedulers.Where(s => s.Value.Tenant == tenant && s.Value.CanRun()).Select(s => s.Value).ToArray();
        }

        private void UpdateSchedulers(IEnumerable<string> tenants, Action<BackgroundTaskScheduler> action)
        {
            var keys = _schedulers.Where(kv => tenants.Contains(kv.Value.Tenant)).Select(kv => kv.Key).ToArray();

            foreach (var key in keys)
            {
                if (_schedulers.TryGetValue(key, out BackgroundTaskScheduler scheduler))
                {
                    action(scheduler);
                }
            }
        }

        private void CleanSchedulers(string tenant, IEnumerable<IBackgroundTask> tasks)
        {
            var validKeys = tasks.Select(task => tenant + task.GetTaskName()).ToArray();

            var keys = _schedulers.Where(kv => kv.Value.Tenant == tenant).Select(kv => kv.Key).ToArray();

            foreach (var key in keys)
            {
                if (!validKeys.Contains(key))
                {
                    _schedulers.TryRemove(key, out var scheduler);
                }
            }
        }
    }

    internal static class EngineExtensions
    {
        public static HttpContext CreateHttpContext(this EngineContext engine)
        {
            return engine.Settings.CreateHttpContext();
        }

        public static HttpContext CreateHttpContext(this EngineSettings settings)
        {
            var urlHost = settings.RequestUrlHost?.Split(new[] { "," },
                StringSplitOptions.RemoveEmptyEntries).FirstOrDefault();

            var context = new DefaultHttpContext();
            context.Request.Host = new HostString(urlHost ?? "localhost");

            if (!String.IsNullOrWhiteSpace(settings.RequestUrlPrefix))
            {
                context.Request.PathBase = "/" + settings.RequestUrlPrefix;
            }

            context.Request.Path = "/";
            context.Items["IsBackground"] = true;
            return context;
        }
    }
}