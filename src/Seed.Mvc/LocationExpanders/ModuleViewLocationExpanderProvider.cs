using Microsoft.AspNetCore.Mvc.Razor;
using Microsoft.AspNetCore.Mvc.Razor.Internal;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Caching.Memory;
using Seed.Environment.Engine.Descriptors;
using Seed.Mvc.FileProviders;
using Seed.Plugins;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Seed.Mvc.LocationExpanders
{
    public class ModuleViewLocationExpanderProvider : IViewLocationExpanderProvider
    {
        private const string CacheKey = "ModuleComponentViewLocations)";
        private static IList<IPluginInfo> _modulesWithComponentViews;
        private static object _synLock = new object();

        private readonly IPluginManager _pluginManager;
        private readonly EngineDescriptor _engineDescriptor;
        private readonly IMemoryCache _memoryCache;

        public ModuleViewLocationExpanderProvider(
            IRazorViewEngineFileProviderAccessor fileProviderAccessor,
            IPluginManager pluginManager,
            EngineDescriptor shellDescriptor,
            IMemoryCache memoryCache)
        {
            _pluginManager = pluginManager;
            _engineDescriptor = shellDescriptor;
            _memoryCache = memoryCache;

            if (_modulesWithComponentViews != null)
            {
                return;
            }

            lock (_synLock)
            {
                if (_modulesWithComponentViews == null)
                {
                    var modulesWithComponentViews = new List<IPluginInfo>();

                    var orderedModules = _pluginManager.GetPlugins()
                        //.Where(e => e.Manifest.Type.Equals("module", StringComparison.OrdinalIgnoreCase))
                        .Reverse();

                    foreach (var module in orderedModules)
                    {
                        var moduleComponentsViewFilePaths = fileProviderAccessor.FileProvider.GetViewFilePaths(
                            module.SubPath + "/Views/Shared/Components", new[] { RazorViewEngine.ViewExtension },
                            viewsFolder: null, inViewsFolder: true, inDepth: true);

                        if (moduleComponentsViewFilePaths.Any())
                        {
                            modulesWithComponentViews.Add(module);
                        }
                    }

                    _modulesWithComponentViews = modulesWithComponentViews;
                }
            }
        }

        public int Priority => 5;

        public void PopulateValues(ViewLocationExpanderContext context)
        {
        }

        public virtual IEnumerable<string> ExpandViewLocations(ViewLocationExpanderContext context,
                                                               IEnumerable<string> viewLocations)
        {
            if (context.ActionContext.ActionDescriptor is PageActionDescriptor page)
            {
                var pageViewLocations = PageViewLocations().ToList();
                pageViewLocations.AddRange(viewLocations);
                return pageViewLocations;

                IEnumerable<string> PageViewLocations()
                {
                    if (page.RelativePath.Contains("/Pages/") && !page.RelativePath.StartsWith("/Pages/", StringComparison.Ordinal))
                    {
                        yield return page.RelativePath.Substring(0, page.RelativePath.IndexOf("/Pages/", StringComparison.Ordinal))
                            + "/Views/Shared/{0}" + RazorViewEngine.ViewExtension;
                    }
                }
            }

            var plugin = _pluginManager.GetPlugin(context.AreaName);

            if (!plugin.Exists)
            {
                return viewLocations;
            }

            var result = new List<string>();

            var pluginViewsPath = '/' + plugin.SubPath + "/Views";
            result.Add(pluginViewsPath + "/{1}/{0}" + RazorViewEngine.ViewExtension);

            if (!context.ViewName.StartsWith("Components/", StringComparison.Ordinal))
            {
                result.Add(pluginViewsPath + "/Shared/{0}" + RazorViewEngine.ViewExtension);
            }
            else
            {
                if (!_memoryCache.TryGetValue(CacheKey, out IEnumerable<string> moduleComponentViewLocations))
                {
                    var enabledIds = _pluginManager.GetFeatures().Where(f => _engineDescriptor
                        .Features.Any(sf => sf.Id == f.Id)).Select(f => f.Plugin.Id).Distinct().ToArray();

                    var enabledExtensions = _pluginManager.GetPlugins()
                        .Where(e => enabledIds.Contains(e.Id)).ToArray();

                    var sharedViewsPath = "/Views/Shared/{0}" + RazorViewEngine.ViewExtension;

                    moduleComponentViewLocations = _modulesWithComponentViews
                        .Where(m => enabledExtensions.Any(e => e.Id == m.Id))
                        .Select(m => '/' + m.SubPath + sharedViewsPath);

                    _memoryCache.Set(CacheKey, moduleComponentViewLocations);
                }

                result.AddRange(moduleComponentViewLocations);
            }

            result.AddRange(viewLocations);

            return result;
        }
    }
}
