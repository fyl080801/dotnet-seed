using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Seed.Environment.Engine;
using Seed.Modules;
using Seed.Modules.DeferredTasks;
using Seed.Modules.Exceptions;
using Seed.Project.Domain;
using Seed.Project.Events;
using Seed.Project.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Runtime.ExceptionServices;
using System.Threading.Tasks;

namespace Seed.Project
{
    public class ProjectExecutor : IProjectExecutor
    {
        readonly ProjectHarvestingOptions _projectOptions;
        readonly IApplicationLifetime _applicationLifetime;
        readonly EngineSettings _engineSettings;
        readonly IEngineHost _host;
        readonly IEnumerable<IProjectEventHandler> _projectEventHandlers;
        readonly IProjectStore _projectStore;
        readonly ILogger _logger;

        public ProjectExecutor(
            IOptions<ProjectHarvestingOptions> projectOptions,
            IApplicationLifetime applicationLifetime,
            EngineSettings engineSettings,
            IEngineHost host,
            IEnumerable<IProjectEventHandler> projectEventHandlers,
            IProjectStore projectStore,
            ILogger<ProjectExecutor> logger)
        {
            _projectOptions = projectOptions.Value;
            _applicationLifetime = applicationLifetime;
            _engineSettings = engineSettings;
            _host = host;
            _projectEventHandlers = projectEventHandlers;
            _projectStore = projectStore;
            _logger = logger;
        }

        public async Task<string> ExecuteAsync(string executionId, ProjectDescriptor projectDescriptor, object environment)
        {
            await _projectEventHandlers.InvokeAsync(e => e.ExecutingAsync(executionId, projectDescriptor), _logger);
            try
            {
                //_environmentMethodProvider = new ParametersMethodProvider(environment);

                var result = await _projectStore.CreateAsync(new ProjectResult
                {
                    ExecutionId = executionId,
                    ProjectName = projectDescriptor.Name,
                    DisplayName = projectDescriptor.DisplayName,
                    Description = projectDescriptor.Description,
                    Version = projectDescriptor.Version
                });

                using (var stream = projectDescriptor.ProjectFileInfo.CreateReadStream())
                {
                    using (var file = new StreamReader(stream))
                    {
                        using (var reader = new JsonTextReader(file))
                        {
                            while (reader.Read())
                            {
                                //if (reader.Path == "variables")
                                //{
                                //    reader.Read();

                                //    var variables = JObject.Load(reader);
                                //    _variablesMethodProvider = new VariablesMethodProvider(variables);
                                //}

                                if (reader.Path == "steps" && reader.TokenType == JsonToken.StartArray)
                                {
                                    while (reader.Read() && reader.Depth > 1)
                                    {
                                        if (reader.Depth == 2)
                                        {
                                            var child = JObject.Load(reader);

                                            var projectStep = new ProjectExecutionContext
                                            {
                                                Name = child.Value<string>("name"),
                                                Step = child,
                                                ExecutionId = executionId,
                                                Environment = environment
                                            };

                                            var stepResult = new ProjectStepResult { StepName = projectStep.Name };
                                            result.Steps.Add(stepResult);
                                            await _projectStore.UpdateAsync(result);

                                            ExceptionDispatchInfo capturedException = null;
                                            try
                                            {
                                                await ExecuteStepAsync(projectStep);
                                                stepResult.IsSuccessful = true;
                                            }
                                            catch (Exception e)
                                            {
                                                stepResult.IsSuccessful = false;
                                                stepResult.ErrorMessage = e.ToString();

                                                capturedException = ExceptionDispatchInfo.Capture(e);
                                            }

                                            stepResult.IsCompleted = true;
                                            await _projectStore.UpdateAsync(result);

                                            if (stepResult.IsSuccessful == false)
                                            {
                                                capturedException.Throw();
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

                await _projectEventHandlers.InvokeAsync(x => x.ExecutedAsync(executionId, projectDescriptor), _logger);

                await _projectStore.UpdateAsync(result);

                return executionId;
            }
            catch (Exception ex)
            {
                await _projectEventHandlers.InvokeAsync(e => e.ExecutionFailedAsync(executionId, projectDescriptor), _logger);
                throw ex;
            }
        }

        private async Task ExecuteStepAsync(ProjectExecutionContext projectStep)
        {
            var engineContext = await _host.GetOrCreateEngineContextAsync(_engineSettings);
            using (var scope = engineContext.CreateScope())
            {
                if (!engineContext.IsActivated)
                {
                    var tenantEvents = scope.ServiceProvider.GetServices<IModuleTenantEvents>();

                    foreach (var tenantEvent in tenantEvents)
                    {
                        tenantEvent.ActivatingAsync().Wait();
                    }

                    engineContext.IsActivated = true;

                    foreach (var tenantEvent in tenantEvents)
                    {
                        tenantEvent.ActivatedAsync().Wait();
                    }
                }

                var projectStepHandlers = scope.ServiceProvider.GetServices<IProjectStepHandler>();
                //var scriptingManager = scope.ServiceProvider.GetRequiredService<IScriptingManager>();
                //scriptingManager.GlobalMethodProviders.Add(_environmentMethodProvider);

                //// Substitutes the script elements by their actual values
                //EvaluateScriptNodes(recipeStep, scriptingManager);

                foreach (var projectStepHandler in projectStepHandlers)
                {
                    if (_logger.IsEnabled(LogLevel.Information))
                    {
                        _logger.LogInformation("Executing project step '{0}'.", projectStep.Name);
                    }

                    await _projectEventHandlers.InvokeAsync(e => e.StepExecutingAsync(projectStep), _logger);

                    await projectStepHandler.ExecuteAsync(projectStep);

                    await _projectEventHandlers.InvokeAsync(e => e.StepExecutedAsync(projectStep), _logger);

                    if (_logger.IsEnabled(LogLevel.Information))
                    {
                        _logger.LogInformation("Finished executing project step '{0}'.", projectStep.Name);
                    }
                }
            }

            engineContext = await _host.GetOrCreateEngineContextAsync(_engineSettings);
            using (var scope = engineContext.CreateScope())
            {
                var deferredTaskEngine = scope.ServiceProvider.GetService<IDeferredTaskEngine>();

                if (deferredTaskEngine != null && deferredTaskEngine.HasPendingTasks)
                {
                    await deferredTaskEngine.ExecuteTasksAsync(new DeferredTaskContext(scope.ServiceProvider));
                }
            }
        }
    }
}
