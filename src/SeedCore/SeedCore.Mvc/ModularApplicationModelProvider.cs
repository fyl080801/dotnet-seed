using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.ApplicationModels;
using SeedCore.Addon.Features;
using SeedCore.Shell;
using SeedCore.Shell.Descriptor.Models;
using SeedCore.Shell.Models;

namespace SeedCore.Mvc
{
    public class ModularApplicationModelProvider : IApplicationModelProvider
    {
        private readonly ITypeFeatureProvider _typeFeatureProvider;
        private readonly IHostingEnvironment _hostingEnvironment;
        private readonly ShellSettings _shellSettings;

        public ModularApplicationModelProvider(
            ITypeFeatureProvider typeFeatureProvider,
            IHostingEnvironment hostingEnvironment,
            ShellSettings shellSettings)
        {
            _typeFeatureProvider = typeFeatureProvider;
            _hostingEnvironment = hostingEnvironment;
            _shellSettings = shellSettings;
        }

        public int Order
        {
            get
            {
                return 1000;
            }
        }

        public void OnProvidersExecuted(ApplicationModelProviderContext context)
        {
            foreach (var controller in context.Result.Controllers)
            {
                var controllerType = controller.ControllerType.AsType();
                var blueprint = _typeFeatureProvider.GetFeatureForDependency(controllerType);

                if (blueprint != null)
                {
                    if (blueprint.Extension.Id == _hostingEnvironment.ApplicationName &&
                        _shellSettings.State != TenantState.Running)
                    {
                        foreach (var action in controller.Actions)
                        {
                            action.Selectors.Clear();
                        }

                        controller.Selectors.Clear();
                    }
                    else
                    {
                        controller.RouteValues.Add("area", blueprint.Extension.Id);
                    }
                }
            }
        }

        public void OnProvidersExecuting(ApplicationModelProviderContext context)
        {
        }
    }
}
