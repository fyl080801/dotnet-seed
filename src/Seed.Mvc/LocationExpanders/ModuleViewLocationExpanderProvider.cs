using Microsoft.AspNetCore.Mvc.Razor;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Seed.Plugins;
using System.Collections.Generic;
using System.Linq;

namespace Seed.Mvc.LocationExpanders
{
    public class ModuleViewLocationExpanderProvider : IViewLocationExpanderProvider
    {
        readonly IPluginManager _pluginManager;

        public int Priority => 5;

        public ModuleViewLocationExpanderProvider(IPluginManager pluginManager)
        {
            _pluginManager = pluginManager;
        }

        public IEnumerable<string> ExpandViewLocations(ViewLocationExpanderContext context, IEnumerable<string> viewLocations)
        {
            if (context.ActionContext.ActionDescriptor is PageActionDescriptor page)
            {
                var pageViewLocations = PageViewLocations(page).ToList();
                pageViewLocations.AddRange(viewLocations);
                return pageViewLocations;
            }

            var plugin = _pluginManager.GetPlugin(context.AreaName);

            if (!plugin.Exists)
            {
                return viewLocations;
            }

            var result = new List<string>();

            var pluginViewsPath = '/' + plugin.Path + "/Views";
            result.Add(pluginViewsPath + "/{1}/{0}" + RazorViewEngine.ViewExtension);
            result.Add(pluginViewsPath + "/Shared/{0}" + RazorViewEngine.ViewExtension);

            result.AddRange(viewLocations);

            return result;
        }

        public void PopulateValues(ViewLocationExpanderContext context)
        {

        }

        private IEnumerable<string> PageViewLocations(PageActionDescriptor page)
        {
            if (page.RelativePath.Contains("/Pages/") && !page.RelativePath.StartsWith("/Pages/"))
            {
                yield return page.RelativePath.Substring(0, page.RelativePath.IndexOf("/Pages/")) + "/Views/Shared/{0}" + RazorViewEngine.ViewExtension;
            }
        }
    }
}
