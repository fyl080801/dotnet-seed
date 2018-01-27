using Seed.Environment.Engine.Builder;
using Seed.Environment.Engine.Descriptors;
using Seed.Plugins;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Seed.Environment.Engine
{
    public class EngineHost : IEngineHost, IEngineDescriptorManagerEventHandler
    {
        //readonly static object _locker = new object();

        readonly IEngineSettingsManager _engineSettingsManager;
        readonly IEngineContextFactory _engineContextFactory;
        readonly IPluginManager _pluginManager;
        readonly IRunningEngineTable _runningEngineTable;

        private ConcurrentDictionary<string, EngineContext> _contexts;

        public EngineHost(
            IEngineSettingsManager engineSettingsManager,
            IEngineContextFactory engineContextFactory,
            IPluginManager pluginManager,
            IRunningEngineTable runningEngineTable)
        {
            _engineSettingsManager = engineSettingsManager;
            _engineContextFactory = engineContextFactory;
            _pluginManager = pluginManager;
            _runningEngineTable = runningEngineTable;
        }

        public Task<EngineContext> CreateContextAsync(EngineSettings settings)
        {
            // Tenant 会话未初始化创建安装 Context
            if (settings.State == TenantStates.Uninitialized)
            {
                return _engineContextFactory.CreateSetupContextAsync(settings);
            }
            // Tenant 已禁用创建默认 Context
            else if (settings.State == TenantStates.Disabled)
            {
                return Task.FromResult(new EngineContext { Settings = settings });
            }
            // Tenant 正在运行
            else if (settings.State == TenantStates.Running || settings.State == TenantStates.Initializing)
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
            if (_contexts.TryRemove(settings.Name, out EngineContext context))
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
            var features = _pluginManager.GetFeaturesAsync();
            var allSettings = _engineSettingsManager.LoadSettings().Where(CanCreateEngine).ToArray();

            features.Wait();

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
            // 不能直接判断 Invalid
            return
                settings.State == TenantStates.Running ||
                settings.State == TenantStates.Uninitialized ||
                settings.State == TenantStates.Initializing ||
                settings.State == TenantStates.Disabled;
        }

        private bool CanRegisterEngine(EngineSettings settings)
        {
            return
                settings.State == TenantStates.Running ||
                settings.State == TenantStates.Uninitialized ||
                settings.State == TenantStates.Initializing;
        }

        public Task Changed(EngineDescriptor descriptor, string tenant)
        {
            if (_contexts == null)
            {
                return Task.CompletedTask;
            }

            if (_contexts.TryRemove(tenant, out var context))
            {
                context.Release();
            }

            return Task.CompletedTask;
        }
    }
}
