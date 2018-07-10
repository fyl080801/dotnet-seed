using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Logging;
using Seed.Environment.Engine;
using Seed.Environment.Engine.Builders;
using Seed.Environment.Engine.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Security;
using System.Threading;

namespace Seed.Environment.BackgroundTasks
{
    public class BackgroundTaskService : IBackgroundTaskService, IDisposable
    {
        private static TimeSpan DontStart = TimeSpan.FromMilliseconds(-1);
        private static TimeSpan Delay = TimeSpan.FromSeconds(1);

        private readonly Dictionary<string, IEnumerable<IBackgroundTask>> _tasks;
        private readonly IApplicationLifetime _applicationLifetime;
        private readonly IEngineHost _host;
        private readonly EngineSettings _engineSettings;
        private readonly Dictionary<IBackgroundTask, BackgroundTaskState> _states;
        private readonly Dictionary<string, Timer> _timers;
        private readonly Dictionary<string, TimeSpan> _periods;

        public BackgroundTaskService(
            IEngineHost seedHost,
            EngineSettings engineSettings,
            IApplicationLifetime applicationLifetime,
            IEnumerable<IBackgroundTask> tasks,
            ILogger<BackgroundTaskService> logger)
        {
            _engineSettings = engineSettings;
            _host = seedHost;
            _applicationLifetime = applicationLifetime;
            _tasks = tasks.GroupBy(GetGroupName).ToDictionary(x => x.Key, x => x.Select(i => i));
            _states = tasks.ToDictionary(x => x, x => BackgroundTaskState.Idle);
            _timers = _tasks.Keys.ToDictionary(x => x, x => CreateTimer(DoWorkAsync, x));
            _periods = _tasks.Keys.ToDictionary(x => x, x => TimeSpan.FromMinutes(1));
            Logger = logger;
        }

        public ILogger Logger { get; set; }

        public void Activate()
        {
            if (_engineSettings.State == TenantStates.Running)
            {
                foreach (var group in _timers.Keys)
                {
                    var timer = _timers[group];
                    var period = _periods[group];
                    timer.Change(Delay, period);
                }
            }
        }

        private async void DoWorkAsync(object group)
        {
            EngineContext engineContext = _host.GetOrCreateEngineContext(_engineSettings);

            var groupName = group as string ?? "";

            foreach (var task in _tasks[groupName])
            {
                var taskName = task.GetType().FullName;

                using (var scope = engineContext.EnterServiceScope())
                {
                    try
                    {
                        if (_states[task] != BackgroundTaskState.Idle)
                        {
                            return;
                        }

                        lock (_states)
                        {
                            if (_states[task] != BackgroundTaskState.Idle)
                            {
                                return;
                            }

                            _states[task] = BackgroundTaskState.Running;
                        }

                        if (Logger.IsEnabled(LogLevel.Information))
                        {
                            Logger.LogInformation("Start processing background task '{BackgroundTaskName}'.", taskName);
                        }

                        await task.DoWorkAsync(scope.ServiceProvider, _applicationLifetime.ApplicationStopping);

                        if (Logger.IsEnabled(LogLevel.Information))
                        {
                            Logger.LogInformation("Finished processing background task '{BackgroundTaskName}'.", taskName);
                        }
                    }
                    catch (Exception ex)
                    {
                        Logger.LogError(ex, "Error while processing background task '{BackgroundTaskName}'", taskName);
                    }
                    finally
                    {
                        lock (_states)
                        {
                            if (_states[task] != BackgroundTaskState.Stopped)
                            {
                                _states[task] = BackgroundTaskState.Idle;
                            }
                        }
                    }
                }
            }
        }

        public void Terminate()
        {
            lock (_states)
            {
                var tasks = _states.Keys.ToArray();

                foreach (var task in tasks)
                {
                    _states[task] = BackgroundTaskState.Stopped;
                }
            }
        }

        private string GetGroupName(IBackgroundTask task)
        {
            var attributes = task.GetType().GetCustomAttributes<BackgroundTaskAttribute>().ToList();

            if (attributes.Count == 0)
            {
                return "";
            }

            return attributes.First().Group ?? "";
        }

        public IDictionary<IBackgroundTask, BackgroundTaskState> GetTasks()
        {
            return _states;
        }

        public void SetDelay(string group, TimeSpan period)
        {
            var groupName = group ?? "";

            _periods[groupName] = period;
            _timers[groupName].Change(DontStart, period);
        }

        public void Dispose()
        {
            foreach (var timer in _timers.Values)
            {
                timer.Dispose();
            }
        }

        [SecuritySafeCritical]
        private static Timer CreateTimer(TimerCallback callback, string name)
        {
            var restore = false;
            try
            {
                if (!ExecutionContext.IsFlowSuppressed())
                {
                    ExecutionContext.SuppressFlow();
                    restore = true;
                }

                return new Timer(callback, name, Timeout.Infinite, Timeout.Infinite);
            }
            finally
            {
                if (restore)
                {
                    ExecutionContext.RestoreFlow();
                }
            }
        }
    }
}
