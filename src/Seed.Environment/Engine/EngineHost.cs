using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Seed.Environment.Engine.Builders;
using Seed.Environment.Engine.Descriptor.Models;
using Seed.Environment.Engine.Models;
using Seed.Environment.Plugins;
using Seed.Modules;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Seed.Environment.Engine
{
    public class EngineHost : IEngineHost, IEngineDescriptorManagerEventHandler, IDisposable
    {
        private readonly IEngineSettingsManager _engineSettingsManager;
        private readonly IEngineContextFactory _engineContextFactory;
        private readonly IRunningEngineTable _runningEngineTable;
        private readonly ILogger _logger;

        private bool _initialized;
        private ConcurrentDictionary<string, EngineContext> _engineContexts;
        private readonly IPluginManager _extensionManager;
        private SemaphoreSlim _initializingSemaphore = new SemaphoreSlim(1);
        private readonly ConcurrentDictionary<string, SemaphoreSlim> _engineSemaphores = new ConcurrentDictionary<string, SemaphoreSlim>();

        public EngineHost(
            IEngineSettingsManager engineSettingsManager,
            IEngineContextFactory engineContextFactory,
            IRunningEngineTable runningEngineTable,
            IPluginManager extensionManager,
            ILogger<EngineHost> logger)
        {
            _extensionManager = extensionManager;
            _engineSettingsManager = engineSettingsManager;
            _engineContextFactory = engineContextFactory;
            _runningEngineTable = runningEngineTable;
            _logger = logger;
        }

        public async Task InitializeAsync()
        {
            if (!_initialized)
            {
                try
                {
                    await _initializingSemaphore.WaitAsync();

                    if (!_initialized)
                    {
                        _engineContexts = new ConcurrentDictionary<string, EngineContext>();
                        await PreCreateAndRegisterEnginesAsync();
                    }
                }
                finally
                {
                    _initialized = true;
                    _initializingSemaphore.Release();
                }
            }
        }

        public async Task<EngineContext> GetOrCreateEngineContextAsync(EngineSettings settings)
        {
            EngineContext engine = null;

            while (engine == null)
            {
                if (!_engineContexts.TryGetValue(settings.Name, out engine))
                {
                    var semaphore = _engineSemaphores.GetOrAdd(settings.Name, (name) => new SemaphoreSlim(1));

                    await semaphore.WaitAsync();

                    try
                    {
                        if (!_engineContexts.TryGetValue(settings.Name, out engine))
                        {
                            engine = await CreateEngineContextAsync(settings);
                            AddAndRegisterEngine(engine);
                        }

                    }
                    finally
                    {
                        semaphore.Release();
                        _engineSemaphores.TryRemove(settings.Name, out semaphore);
                    }
                }

                if (engine.Released)
                {
                    _engineContexts.TryRemove(settings.Name, out var value);
                    engine = null;
                }
            }

            return engine;
        }

        public async Task<IServiceScope> GetScopeAsync(EngineSettings settings)
        {
            return (await GetScopeAndContextAsync(settings)).Scope;
        }

        public async Task<(IServiceScope Scope, EngineContext EngineContext)> GetScopeAndContextAsync(EngineSettings settings)
        {
            IServiceScope scope = null;
            EngineContext engineContext = null;

            while (scope == null)
            {
                if (!_engineContexts.TryGetValue(settings.Name, out engineContext))
                {
                    engineContext = await GetOrCreateEngineContextAsync(settings);
                }

                scope = engineContext.CreateScope();

                if (scope == null)
                {
                    _engineContexts.TryRemove(settings.Name, out var value);
                }
            }

            return (scope, engineContext);
        }

        public Task UpdateEngineSettingsAsync(EngineSettings settings)
        {
            _engineSettingsManager.SaveSettings(settings);
            return ReloadEngineContextAsync(settings);
        }

        async Task PreCreateAndRegisterEnginesAsync()
        {
            if (_logger.IsEnabled(LogLevel.Information))
            {
                _logger.LogInformation("Start creation of engines");
            }

            var features = _extensionManager.LoadFeaturesAsync();

            var allSettings = _engineSettingsManager.LoadSettings().Where(CanCreateEngine).ToArray();
            var defaultSettings = allSettings.FirstOrDefault(s => s.Name == EngineHelper.DefaultEngineName);
            var otherSettings = allSettings.Except(new[] { defaultSettings }).ToArray();

            features.Wait();

            if (defaultSettings?.State != TenantStates.Running)
            {
                var setupContext = await CreateSetupContextAsync(defaultSettings);
                AddAndRegisterEngine(setupContext);
                allSettings = otherSettings;
            }

            if (allSettings.Length > 0)
            {
                foreach (var settings in allSettings)
                {
                    if (settings.Name == EngineHelper.DefaultEngineName)
                    {
                        await GetOrCreateEngineContextAsync(settings);
                        continue;
                    }

                    AddAndRegisterEngine(new EngineContext.PlaceHolder { Settings = settings });
                };
            }

            if (_logger.IsEnabled(LogLevel.Information))
            {
                _logger.LogInformation("Done pre-creating and registering engines");
            }
        }

        private void AddAndRegisterEngine(EngineContext context)
        {
            if (_engineContexts.TryAdd(context.Settings.Name, context) && CanRegisterEngine(context))
            {
                RegisterEngineSettings(context.Settings);
            }
        }

        private bool CanRegisterEngine(EngineContext context)
        {
            if (!CanRegisterEngine(context.Settings))
            {
                if (_logger.IsEnabled(LogLevel.Debug))
                {
                    _logger.LogDebug("Skipping engine context registration for tenant '{TenantName}'", context.Settings.Name);
                }

                return false;
            }

            return true;
        }

        private void RegisterEngineSettings(EngineSettings settings)
        {
            if (_logger.IsEnabled(LogLevel.Debug))
            {
                _logger.LogDebug("Registering engine context for tenant '{TenantName}'", settings.Name);
            }

            _runningEngineTable.Add(settings);
        }

        public Task<EngineContext> CreateEngineContextAsync(EngineSettings settings)
        {
            if (settings.State == TenantStates.Uninitialized)
            {
                if (_logger.IsEnabled(LogLevel.Debug))
                {
                    _logger.LogDebug("Creating engine context for tenant '{TenantName}' setup", settings.Name);
                }

                return _engineContextFactory.CreateSetupContextAsync(settings);
            }
            else if (settings.State == TenantStates.Disabled)
            {
                if (_logger.IsEnabled(LogLevel.Debug))
                {
                    _logger.LogDebug("Creating disabled engine context for tenant '{TenantName}'", settings.Name);
                }

                return Task.FromResult(new EngineContext { Settings = settings });
            }
            else if (settings.State == TenantStates.Running || settings.State == TenantStates.Initializing)
            {
                if (_logger.IsEnabled(LogLevel.Debug))
                {
                    _logger.LogDebug("Creating engine context for tenant '{TenantName}'", settings.Name);
                }

                return _engineContextFactory.CreateEngineContextAsync(settings);
            }
            else
            {
                throw new InvalidOperationException("Unexpected engine state for " + settings.Name);
            }
        }

        private Task<EngineContext> CreateSetupContextAsync(EngineSettings defaultSettings)
        {
            if (_logger.IsEnabled(LogLevel.Debug))
            {
                _logger.LogDebug("Creating engine context for root setup.");
            }

            if (defaultSettings == null)
            {
                var engineSettings = _engineSettingsManager.CreateDefaultSettings();
                engineSettings.Name = EngineHelper.DefaultEngineName;
                engineSettings.State = TenantStates.Uninitialized;
                defaultSettings = engineSettings;
            }

            return _engineContextFactory.CreateSetupContextAsync(defaultSettings);
        }

        Task IEngineDescriptorManagerEventHandler.Changed(EngineDescriptor descriptor, string tenant)
        {
            if (_logger.IsEnabled(LogLevel.Information))
            {
                _logger.LogInformation("A tenant needs to be restarted '{TenantName}'", tenant);
            }

            if (_engineContexts == null)
            {
                return Task.CompletedTask;
            }

            if (_engineContexts.TryRemove(tenant, out var context))
            {
                context.Release();
            }

            return Task.CompletedTask;
        }

        public Task ReloadEngineContextAsync(EngineSettings settings)
        {
            if (settings.State == TenantStates.Disabled)
            {
                if (_engineContexts.TryGetValue(settings.Name, out var value) && value.ActiveScopes > 0)
                {
                    _runningEngineTable.Remove(settings);
                    return Task.CompletedTask;
                }
            }

            if (_engineContexts.TryRemove(settings.Name, out var context))
            {
                _runningEngineTable.Remove(settings);
                context.Release();
            }

            return GetOrCreateEngineContextAsync(settings);
        }

        public IEnumerable<EngineContext> ListEngineContexts()
        {
            return _engineContexts?.Values.ToArray() ?? Enumerable.Empty<EngineContext>();
        }

        public bool TryGetSettings(string name, out EngineSettings settings)
        {
            if (_engineContexts != null && _engineContexts.TryGetValue(name, out var engine))
            {
                settings = engine.Settings;
                return true;
            }

            settings = null;
            return false;
        }

        public IEnumerable<EngineSettings> GetAllSettings()
        {
            var engines = _engineContexts?.Values.ToArray();

            if (engines == null || engines.Length == 0)
            {
                return Enumerable.Empty<EngineSettings>();
            }

            return engines.Select(s => s.Settings);
        }

        private bool CanCreateEngine(EngineSettings engineSettings)
        {
            return
                engineSettings.State == TenantStates.Running ||
                engineSettings.State == TenantStates.Uninitialized ||
                engineSettings.State == TenantStates.Initializing ||
                engineSettings.State == TenantStates.Disabled;
        }

        private bool CanRegisterEngine(EngineSettings engineSettings)
        {
            return
                engineSettings.State == TenantStates.Running ||
                engineSettings.State == TenantStates.Uninitialized ||
                engineSettings.State == TenantStates.Initializing;
        }

        public void Dispose()
        {
            if (_engineContexts == null)
            {
                return;
            }

            var engines = _engineContexts.Values.ToArray();

            foreach (var engine in engines)
            {
                engine.Dispose();
            }
        }
    }
}
