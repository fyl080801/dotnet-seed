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
using System.Threading.Tasks;

namespace Seed.Environment.Engine
{
    public class EngineHost : IEngineHost, IEngineDescriptorManagerEventHandler
    {
        private readonly IEngineSettingsManager _engineSettingsManager;
        private readonly IEngineContextFactory _engineContextFactory;
        private readonly IRunningEngineTable _runningEngineTable;
        private readonly ILogger _logger;

        private readonly static object _syncLock = new object();
        private ConcurrentDictionary<string, EngineContext> _engineContexts;
        private readonly IPluginManager _pluginManager;

        public EngineHost(
            IEngineSettingsManager engineSettingsManager,
            IEngineContextFactory engineContextFactory,
            IRunningEngineTable runningEngineTable,
            IPluginManager pluginManager,
            ILogger<EngineHost> logger)
        {
            _pluginManager = pluginManager;
            _engineSettingsManager = engineSettingsManager;
            _engineContextFactory = engineContextFactory;
            _runningEngineTable = runningEngineTable;
            _logger = logger;
        }

        public void Initialize()
        {
            BuildCurrent();
        }

        IDictionary<string, EngineContext> BuildCurrent()
        {
            if (_engineContexts == null)
            {
                lock (this)
                {
                    if (_engineContexts == null)
                    {
                        _engineContexts = new ConcurrentDictionary<string, EngineContext>();
                        CreateAndRegisterEnginesAsync().Wait();
                    }
                }
            }

            return _engineContexts;
        }

        public EngineContext GetOrCreateEngineContext(EngineSettings settings)
        {
            var engine = _engineContexts.GetOrAdd(settings.Name, tenant =>
            {
                var engineContext = CreateEngineContextAsync(settings).Result;
                RegisterEngine(engineContext);

                return engineContext;
            });

            if (engine.Released)
            {
                _engineContexts.TryRemove(settings.Name, out var context);
                return GetOrCreateEngineContext(settings);
            }

            return engine;
        }

        public void UpdateEngineSettings(EngineSettings settings)
        {
            _engineSettingsManager.SaveSettings(settings);
            ReloadEngineContext(settings);
        }

        async Task CreateAndRegisterEnginesAsync()
        {
            if (_logger.IsEnabled(LogLevel.Information))
            {
                _logger.LogInformation("Start creation of engines");
            }

            var features = _pluginManager.LoadFeaturesAsync();

            var allSettings = _engineSettingsManager.LoadSettings().Where(CanCreateEngine).ToArray();

            features.Wait();

            if (allSettings.Length == 0)
            {
                var setupContext = await CreateSetupContextAsync();
                RegisterEngine(setupContext);
            }
            else
            {
                Parallel.ForEach(allSettings, settings =>
                {
                    try
                    {
                        GetOrCreateEngineContext(settings);
                    }
                    catch (Exception ex)
                    {
                        _logger.LogError(ex, "A tenant could not be started '{TenantName}'", settings.Name);

                        if (ex.IsFatal())
                        {
                            throw;
                        }
                    }
                });
            }

            if (_logger.IsEnabled(LogLevel.Information))
            {
                _logger.LogInformation("Done creating engines");
            }
        }

        private void RegisterEngine(EngineContext context)
        {
            if (!CanRegisterEngine(context.Settings))
            {
                if (_logger.IsEnabled(LogLevel.Debug))
                {
                    _logger.LogDebug("Skipping engine context registration for tenant '{TenantName}'", context.Settings.Name);
                }

                return;
            }

            if (_engineContexts.TryAdd(context.Settings.Name, context))
            {
                if (_logger.IsEnabled(LogLevel.Debug))
                {
                    _logger.LogDebug("Registering engine context for tenant '{TenantName}'", context.Settings.Name);
                }
                _runningEngineTable.Add(context.Settings);
            }
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
                    _logger.LogDebug("Creating disabled engine context for tenant '{TenantName}' setup", settings.Name);
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

        private Task<EngineContext> CreateSetupContextAsync()
        {
            if (_logger.IsEnabled(LogLevel.Debug))
            {
                _logger.LogDebug("Creating engine context for root setup.");
            }

            return _engineContextFactory.CreateSetupContextAsync(EngineHelper.BuildDefaultUninitializedEngine);
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

        public void ReloadEngineContext(EngineSettings settings)
        {
            EngineContext context;

            if (_engineContexts.TryRemove(settings.Name, out context))
            {
                _runningEngineTable.Remove(settings);
                context.Release();
            }

            GetOrCreateEngineContext(settings);
        }

        public IEnumerable<EngineContext> ListEngineContexts()
        {
            return _engineContexts.Values;
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
    }
}
