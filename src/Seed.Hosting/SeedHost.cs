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

        public EngineContext GetOrCreateEngineContext(EngineVariables variables)
        {
            return _engineContexts.GetOrAdd(variables.Name, consumerEngine =>
            {
                var context = CreateEngineContext(variables);
                RegisterEngine(context);
                return context;
            });
        }

        public void UpdateEngineSettings(EngineVariables variables)
        {
            _engineManager.SaveVariables(variables);
            ReloadEngineContext(variables);
        }

        public void ReloadEngineContext(EngineVariables variables)
        {
            EngineContext context;
            if (_engineContexts.TryRemove(variables.Name, out context))
            {
                _engineRunningTable.Remove(variables);
                context.Dispose();
            }
            GetOrCreateEngineContext(variables);
        }

        public EngineContext CreateEngineContext(EngineVariables variables)
        {
            if (variables.State == EngineStates.Uninitialized)
            {
                return _engineContextFactory.CreateSetupContext(variables);
            }
            else if (variables.State == EngineStates.Disabled)
            {
                return new EngineContext { Variables = variables };
            }
            else if (variables.State == EngineStates.Running || variables.State == EngineStates.Initializing)
            {
                return _engineContextFactory.CreateEngineContext(variables);
            }
            else
            {
                throw new InvalidOperationException("" + variables.Name);
            }
        }

        public IEnumerable<EngineContext> GetEngineContexts()
        {
            return _engineContexts.Values;
        }

        private void CreateAndRegisterEngines()
        {
            var allvariables = _engineManager.LoadVariables().Where(CanCreateEngine).ToArray();

            if (allvariables.Any())
            {
                Parallel.ForEach(allvariables, variables =>
                {
                    try
                    {
                        GetOrCreateEngineContext(variables);
                    }
                    catch (Exception ex)
                    {
                        _logger.LogError(string.Format("{0}", variables.Name), ex);
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
            if (!CanRegisterEngine(context.Variables))
            {
                return;
            }

            if (_engineContexts.TryAdd(context.Variables.Name, context))
            {
                _engineRunningTable.Add(context.Variables);
            }
        }

        private bool CanCreateEngine(EngineVariables variables)
        {
            return variables.State == EngineStates.Running ||
                variables.State == EngineStates.Uninitialized ||
                variables.State == EngineStates.Initializing ||
                variables.State == EngineStates.Disabled;
        }

        private bool CanRegisterEngine(EngineVariables variables)
        {
            return variables.State == EngineStates.Running ||
                variables.State == EngineStates.Uninitialized ||
                variables.State == EngineStates.Initializing;
        }
    }
}