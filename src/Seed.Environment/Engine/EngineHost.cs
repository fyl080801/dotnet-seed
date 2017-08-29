using Microsoft.Extensions.Logging;
using Seed.Environment.Abstractions.Engine;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Seed.Environment.Engine
{
    public class EngineHost : IEngineHost
    {
        readonly static object _locker = new object();

        readonly IEngineSettingsManager _engineSettingsManager;
        readonly IEngineContextFactory _engineContextFactory;
        readonly IRunningEngineTable _runningEngineTable;

        readonly ILogger _logger;

        private ConcurrentDictionary<string, EngineContext> _contexts;

        public EngineHost(
            IEngineSettingsManager engineSettingsManager,
            IEngineContextFactory engineContextFactory,
            IRunningEngineTable runningEngineTable,
            ILogger<EngineHost> logger)
        {
            _engineSettingsManager = engineSettingsManager;
            _engineContextFactory = engineContextFactory;
            _runningEngineTable = runningEngineTable;
            _logger = logger;
        }

        public Task<EngineContext> CreateContextAsync(EngineSettings settings)
        {
            if (settings.State == LauncherStates.Uninitialized)
            {
                return _engineContextFactory.CreateSetupContextAsync(settings);
            }
            else if (settings.State == LauncherStates.Disabled)
            {
                return Task.FromResult(new EngineContext { Settings = settings });
            }
            else if (settings.State == LauncherStates.Running || settings.State == LauncherStates.Initializing)
            {
                return _engineContextFactory.CreateContextAsync(settings);
            }
            else
            {
                throw new InvalidOperationException("Unexpected engine state for " + settings.Name);
            }
        }

        public IEnumerable<EngineContext> GetContexts()
        {
            return _contexts.Values;
        }

        public EngineContext GetOrCreateContext(EngineSettings settings)
        {
            return _contexts.GetOrAdd(settings.Name, e =>
            {
                var engineContext = CreateContextAsync(settings).Result;
                RegisterEngine(engineContext);
                return engineContext;
            });
        }

        public void Initialize()
        {
            BuildCurrent();
        }

        public void ReloadContext(EngineSettings settings)
        {
            EngineContext context;

            if (_contexts.TryRemove(settings.Name, out context))
            {
                _runningEngineTable.Remove(settings);
                context.Release();
            }

            GetOrCreateContext(settings);
        }

        public void UpdateSettings(EngineSettings settings)
        {
            _engineSettingsManager.SaveSettings(settings);
            ReloadContext(settings);
        }

        private IDictionary<string, EngineContext> BuildCurrent()
        {
            if (_contexts == null)
            {
                lock (this)
                {
                    if (_contexts == null)
                    {
                        _contexts = new ConcurrentDictionary<string, EngineContext>();
                        CreateAndRegisterEnginesAsync().Wait();
                    }
                }
            }
            return _contexts;
        }

        private async Task CreateAndRegisterEnginesAsync()
        {
            var allSettings = _engineSettingsManager.LoadSettings().Where(CanCreateEngine).ToArray();

            if (allSettings.Length <= 0)
            {
                RegisterEngine(await CreateSetupContextAsync());
            }
            else
            {
                Parallel.ForEach(allSettings, settings =>
                {
                    GetOrCreateContext(settings);
                });
            }
        }

        private Task<EngineContext> CreateSetupContextAsync()
        {
            return _engineContextFactory.CreateSetupContextAsync(EngineHelper.BuildDefaultUninitializedEngine);
        }

        private void RegisterEngine(EngineContext engineContext)
        {
            if (!CanRegisterEngine(engineContext.Settings))
            {
                return;
            }

            if (_contexts.TryAdd(engineContext.Settings.Name, engineContext))
            {
                _runningEngineTable.Add(engineContext.Settings);
            }
        }

        private bool CanCreateEngine(EngineSettings settings)
        {
            return
                settings.State == LauncherStates.Running ||
                settings.State == LauncherStates.Uninitialized ||
                settings.State == LauncherStates.Initializing ||
                settings.State == LauncherStates.Disabled;
        }

        private bool CanRegisterEngine(EngineSettings settings)
        {
            return
                settings.State == LauncherStates.Running ||
                settings.State == LauncherStates.Uninitialized ||
                settings.State == LauncherStates.Initializing;
        }
    }
}
