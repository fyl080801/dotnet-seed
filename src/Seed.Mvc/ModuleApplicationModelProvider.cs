using Microsoft.AspNetCore.Mvc.ApplicationModels;
using Seed.Plugins;
using System;
using System.Collections.Generic;
using System.Text;

namespace Seed.Mvc
{
    public class ModuleApplicationModelProvider : IApplicationModelProvider
    {
        public int Order => 1000;

        private readonly ITypeFeatureProvider _provider;

        public ModuleApplicationModelProvider(ITypeFeatureProvider provider)
        {
            _provider = provider;
        }

        public void OnProvidersExecuted(ApplicationModelProviderContext context)
        {
            foreach (var controller in context.Result.Controllers)
            {
                var schema = _provider.GetFeatureForDependency(controller.ControllerType.AsType());
                if (schema != null)
                {
                    controller.RouteValues.Add("area", schema.Plugin.Id);
                }
            }
        }

        public void OnProvidersExecuting(ApplicationModelProviderContext context)
        {

        }
    }
}
