using Microsoft.AspNetCore.Mvc.ApplicationModels;
using SeedCore.Addon;
using SeedCore.Shell.Descriptor.Models;
using System.Collections.Generic;
using System.Linq;

namespace SeedCore.Mvc.RazorPages
{
    public class ModularPageApplicationModelProvider : IPageApplicationModelProvider
    {
        private IEnumerable<string> _paths;

        public ModularPageApplicationModelProvider(
            IExtensionManager extensionManager,
            ShellDescriptor shellDescriptor)
        {
            // Pages paths of all available modules which are enabled in the current shell.
            _paths = extensionManager.GetFeatures().Where(f => shellDescriptor.Features.Any(sf =>
                sf.Id == f.Id)).Select(f => '/' + f.Extension.SubPath + "/Pages/").Distinct();
        }

        public int Order => -1000 + 10;

        public void OnProvidersExecuting(PageApplicationModelProviderContext context)
        {
        }

        public void OnProvidersExecuted(PageApplicationModelProviderContext context)
        {
            var relativePath = context.ActionDescriptor.RelativePath;
            var found = _paths.Any(p => relativePath.StartsWith(p)) ? true : false;
            context.PageApplicationModel.Filters.Add(new ModularPageViewEnginePathFilter(found));
        }
    }
}
