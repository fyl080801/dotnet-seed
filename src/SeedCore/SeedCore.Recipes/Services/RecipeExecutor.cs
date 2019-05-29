using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using SeedCore.DeferredTasks;
using SeedCore.Modules;
using SeedCore.Recipes.Events;
using SeedCore.Recipes.Models;
using SeedCore.Shell;
using SeedCore.Shell.Builders;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.ExceptionServices;
using System.Threading;
using System.Threading.Tasks;

namespace SeedCore.Recipes.Services
{
    public class RecipeExecutor : IRecipeExecutor
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly ShellSettings _shellSettings;
        private readonly IShellHost _shellHost;
        private readonly IEnumerable<IRecipeEventHandler> _recipeEventHandlers;

        //private VariablesMethodProvider _variablesMethodProvider;
        //private ParametersMethodProvider _environmentMethodProvider;

        public RecipeExecutor(IHttpContextAccessor httpContextAccessor,
                              IEnumerable<IRecipeEventHandler> recipeEventHandlers,
                              ShellSettings shellSettings,
                              IShellHost shellHost,
                              ILogger<RecipeExecutor> logger,
                              IStringLocalizer<RecipeExecutor> localizer)
        {
            _httpContextAccessor = httpContextAccessor;
            _shellHost = shellHost;
            _shellSettings = shellSettings;
            _recipeEventHandlers = recipeEventHandlers;
            Logger = logger;
            T = localizer;
        }

        public ILogger Logger { get; set; }
        public IStringLocalizer T { get; set; }

        public async Task<string> ExecuteAsync(string executionId, RecipeDescriptor recipeDescriptor, object environment, CancellationToken cancellationToken)
        {
            await _recipeEventHandlers.InvokeAsync(x => x.RecipeExecutingAsync(executionId, recipeDescriptor), Logger);

            try
            {
                // _environmentMethodProvider = new ParametersMethodProvider(environment);

                var result = new RecipeResult { ExecutionId = executionId };

                using (var stream = recipeDescriptor.RecipeFileInfo.CreateReadStream())
                {
                    using (var file = new StreamReader(stream))
                    {
                        using (var reader = new JsonTextReader(file))
                        {
                            // Go to Steps, then iterate.
                            while (reader.Read())
                            {
                                if (reader.Path == "variables")
                                {
                                    reader.Read();

                                    //var variables = JObject.Load(reader);
                                    //_variablesMethodProvider = new VariablesMethodProvider(variables);
                                }

                                if (reader.Path == "steps" && reader.TokenType == JsonToken.StartArray)
                                {
                                    while (reader.Read() && reader.Depth > 1)
                                    {
                                        if (reader.Depth == 2)
                                        {
                                            var child = JObject.Load(reader);

                                            var recipeStep = new RecipeExecutionContext
                                            {
                                                Name = child.Value<string>("name"),
                                                Step = child,
                                                ExecutionId = executionId,
                                                Environment = environment,
                                                RecipeDescriptor = recipeDescriptor
                                            };

                                            if (cancellationToken.IsCancellationRequested)
                                            {
                                                Logger.LogError("Recipe interrupted by cancellation token.");
                                                return null;
                                            }

                                            var stepResult = new RecipeStepResult { StepName = recipeStep.Name };
                                            result.Steps.Add(stepResult);

                                            ExceptionDispatchInfo capturedException = null;
                                            try
                                            {
                                                await ExecuteStepAsync(recipeStep);
                                                stepResult.IsSuccessful = true;
                                            }
                                            catch (Exception e)
                                            {
                                                stepResult.IsSuccessful = false;
                                                stepResult.ErrorMessage = e.ToString();

                                                // Because we can't do some async processing the in catch or finally
                                                // blocks, we store the exception to throw it later.

                                                capturedException = ExceptionDispatchInfo.Capture(e);
                                            }

                                            stepResult.IsCompleted = true;

                                            if (stepResult.IsSuccessful == false)
                                            {
                                                capturedException.Throw();
                                            }

                                            if (recipeStep.InnerRecipes != null)
                                            {
                                                foreach (var descriptor in recipeStep.InnerRecipes)
                                                {
                                                    var innerExecutionId = Guid.NewGuid().ToString();
                                                    await ExecuteAsync(innerExecutionId, descriptor, environment, cancellationToken);
                                                }

                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

                await _recipeEventHandlers.InvokeAsync(x => x.RecipeExecutedAsync(executionId, recipeDescriptor), Logger);

                return executionId;
            }
            catch (Exception)
            {
                await _recipeEventHandlers.InvokeAsync(x => x.ExecutionFailedAsync(executionId, recipeDescriptor), Logger);

                throw;
            }
        }

        private async Task ExecuteStepAsync(RecipeExecutionContext recipeStep)
        {
            IServiceScope scope;
            ShellContext shellContext;
            IServiceProvider serviceProvider;

            if (recipeStep.RecipeDescriptor.RequireNewScope)
            {
                (scope, shellContext) = await _shellHost.GetScopeAndContextAsync(_shellSettings);
                serviceProvider = scope.ServiceProvider;
            }
            else
            {
                (scope, shellContext) = (null, null);
                serviceProvider = _httpContextAccessor.HttpContext.RequestServices;
            }

            using (scope)
            {
                if (recipeStep.RecipeDescriptor.RequireNewScope && !shellContext.IsActivated)
                {
                    using (var activatingScope = shellContext.CreateScope())
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

                var recipeStepHandlers = serviceProvider.GetServices<IRecipeStepHandler>();
                //var scriptingManager = serviceProvider.GetRequiredService<IScriptingManager>();
                //scriptingManager.GlobalMethodProviders.Add(_environmentMethodProvider);

                // Substitutes the script elements by their actual values
                // EvaluateScriptNodes(recipeStep, scriptingManager);

                foreach (var recipeStepHandler in recipeStepHandlers)
                {
                    if (Logger.IsEnabled(LogLevel.Information))
                    {
                        Logger.LogInformation("Executing recipe step '{RecipeName}'.", recipeStep.Name);
                    }

                    await _recipeEventHandlers.InvokeAsync(e => e.RecipeStepExecutingAsync(recipeStep), Logger);

                    await recipeStepHandler.ExecuteAsync(recipeStep);

                    await _recipeEventHandlers.InvokeAsync(e => e.RecipeStepExecutedAsync(recipeStep), Logger);

                    if (Logger.IsEnabled(LogLevel.Information))
                    {
                        Logger.LogInformation("Finished executing recipe step '{RecipeName}'.", recipeStep.Name);
                    }
                }
            }

            // E.g if we run migrations defined in a recipe.
            if (!recipeStep.RecipeDescriptor.RequireNewScope)
            {
                return;
            }

            // The recipe execution might have invalidated the shell by enabling new features,
            // so the deferred tasks need to run on an updated shell context if necessary.
            using (var localScope = await _shellHost.GetScopeAsync(_shellSettings))
            {
                var deferredTaskEngine = localScope.ServiceProvider.GetService<IDeferredTaskEngine>();

                // The recipe might have added some deferred tasks to process
                if (deferredTaskEngine != null && deferredTaskEngine.HasPendingTasks)
                {
                    var taskContext = new DeferredTaskContext(localScope.ServiceProvider);
                    await deferredTaskEngine.ExecuteTasksAsync(taskContext);
                }
            }
        }

        //private void EvaluateScriptNodes(RecipeExecutionContext context, IScriptingManager scriptingManager)
        //{
        //    if (_variablesMethodProvider != null)
        //    {
        //        _variablesMethodProvider.ScriptingManager = scriptingManager;
        //        scriptingManager.GlobalMethodProviders.Add(_variablesMethodProvider);
        //    }

        //    EvaluateJsonTree(scriptingManager, context, context.Step);
        //}

        //private void EvaluateJsonTree(IScriptingManager scriptingManager, RecipeExecutionContext context, JToken node)
        //{
        //    switch (node.Type)
        //    {
        //        case JTokenType.Array:
        //            var array = (JArray)node;
        //            for (var i = 0; i < array.Count; i++)
        //            {
        //                EvaluateJsonTree(scriptingManager, context, array[i]);
        //            }
        //            break;
        //        case JTokenType.Object:
        //            foreach (var property in (JObject)node)
        //            {
        //                EvaluateJsonTree(scriptingManager, context, property.Value);
        //            }
        //            break;

        //        case JTokenType.String:

        //            var value = node.Value<string>();

        //            // Evaluate the expression while the result is another expression
        //            while (value.StartsWith("[") && value.EndsWith("]"))
        //            {
        //                value = value.Trim('[', ']');
        //                value = (scriptingManager.Evaluate(value, context.RecipeDescriptor.FileProvider, context.RecipeDescriptor.BasePath, null) ?? "").ToString();
        //                ((JValue)node).Value = value;
        //            }
        //            break;
        //    }
        //}
    }
}
