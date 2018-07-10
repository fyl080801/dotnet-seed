using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.ApplicationModels;
using Microsoft.Extensions.DependencyInjection;
using Seed.Environment.Engine.Descriptor.Models;
using Seed.Environment.Plugins;
using System.Collections.Generic;
using System.Linq;

namespace Seed.Mvc.RazorPages
{
    public class ModularPageApplicationModelProvider : IPageApplicationModelProvider
    {
        private IEnumerable<string> _paths;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public ModularPageApplicationModelProvider(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public int Order => -1000 + 10;

        public void OnProvidersExecuting(PageApplicationModelProviderContext context)
        {
            if (_paths != null)
            {
                return;
            }

            lock (this)
            {
                if (_paths == null)
                {
                    var extensionManager = _httpContextAccessor.HttpContext.RequestServices.GetService<IPluginManager>();
                    var shellDescriptor = _httpContextAccessor.HttpContext.RequestServices.GetService<EngineDescriptor>();

                    _paths = extensionManager.GetFeatures().Where(f => shellDescriptor.Features.Any(sf => sf.Id == f.Id))
                        .Select(f => '/' + f.Plugin.SubPath + "/Pages/").Distinct();
                }
            }
        }

        public void OnProvidersExecuted(PageApplicationModelProviderContext context)
        {
            var viewEnginePath = context.ActionDescriptor.ViewEnginePath;
            var found = _paths.Any(p => viewEnginePath.StartsWith(p)) ? true : false;
            context.PageApplicationModel.Filters.Add(new ModularPageViewEnginePathFilter(found));
        }
    }
}
