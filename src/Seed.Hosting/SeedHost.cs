using Microsoft.Extensions.Logging;
using Seed.Environment.Engine;
using Seed.Environment.Plugin;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Seed.Hosting
{
    public class SeedHost : IHost
    {
        readonly IEngineManager _engineManager;
        readonly IEngineContextFactory _engineContextFactory;
        readonly IEngineRunningTable _engineRunningTable;
        readonly ILogger _logger;

        ConcurrentDictionary<string, EngineContext> _engineContexts;

        public SeedHost(
            IEngineManager engineManager,
            IEngineContextFactory engineContextFactory,
            IEngineRunningTable engineRunningTable,
            ILogger<SeedHost> logger)
        {
            _engineManager = engineManager;
            _engineContextFactory = engineContextFactory;
            _engineRunningTable = engineRunningTable;
            _logger = logger;
        }

        public void Initialize()
        {
            if (_engineContexts == null)
            {
                lock (this)
                {
                    if (_engineContexts == null)
                    {
                        _engineContexts = new ConcurrentDictionary<string, EngineContext>();
                        CreateAndRegisterEngines();
                    }
                }
            }
        }

        public EngineContext GetOrCreateEngineContext(EngineEnvironment environment)
        {
            return _engineContexts.GetOrAdd(environment.Name, consumerEngine =>
            {
                var context = CreateEngineContext(environment);
                RegisterEngine(context);
                return context;
            });
        }

        public void UpdateEngineSettings(EngineEnvironment environment)
        {
            _engineManager.SaveEnvironment(environment);
            ReloadEngineContext(environment);
        }

        public void ReloadEngineContext(EngineEnvironment environment)
        {
            EngineContext context;
            if (_engineContexts.TryRemove(environment.Name, out context))
            {
                _engineRunningTable.Remove(environment);
                context.Dispose();
            }
            GetOrCreateEngineContext(environment);
        }

        public EngineContext CreateEngineContext(EngineEnvironment environment)
        {
            if (environment.State == EngineStates.Uninitialized)
            {
                return _engineContextFactory.CreateSetupContext(environment);
            }
            else if (environment.State == EngineStates.Disabled)
            {
                return new EngineContext { Environment = environment };
            }
            else if (environment.State == EngineStates.Running || environment.State == EngineStates.Initializing)
            {
                return _engineContextFactory.CreateEngineContext(environment);
            }
            else
            {
                throw new InvalidOperationException("" + environment.Name);
            }
        }

        public IEnumerable<EngineContext> GetEngineContexts()
        {
            return _engineContexts.Values;
        }

        private void CreateAndRegisterEngines()
        {
            var allenvironment = _engineManager.LoadEnvironment().Where(CanCreateEngine).ToArray();

            if (allenvironment.Any())
            {
                Parallel.ForEach(allenvironment, environment =>
                {
                    try
                    {
                        GetOrCreateEngineContext(environment);
                    }
                    catch (Exception ex)
                    {
                        _logger.LogError(string.Format("{0}", environment.Name), ex);
                    }
                });
            }

            else
            {
                var setupContext = CreateSetupContext();
                RegisterEngine(setupContext);
            }
        }

        private EngineContext CreateSetupContext()
        {
            return _engineContextFactory.CreateSetupContext(EngineHelper.BuildDefaultUninitializedShell);
        }


        private void RegisterEngine(EngineContext context)
        {
            if (!CanRegisterEngine(context.Environment))
            {
                return;
            }

            if (_engineContexts.TryAdd(context.Environment.Name, context))
            {
                _engineRunningTable.Add(context.Environment);
            }
        }

        private bool CanCreateEngine(EngineEnvironment environment)
        {
            return environment.State == EngineStates.Running ||
                environment.State == EngineStates.Uninitialized ||
                environment.State == EngineStates.Initializing ||
                environment.State == EngineStates.Disabled;
        }

        private bool CanRegisterEngine(EngineEnvironment environment)
        {
            return environment.State == EngineStates.Running ||
                environment.State == EngineStates.Uninitialized ||
                environment.State == EngineStates.Initializing;
        }
    }
}