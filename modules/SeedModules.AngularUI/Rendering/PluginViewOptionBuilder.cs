using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Seed.Data.Extensions;
using Seed.Environment.Engine;
using Seed.Environment.Engine.Extensions;
using Seed.Modules.Site;
using Seed.Plugins;
using Seed.Plugins.Feature;
using SeedModules.AngularUI.Models;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SeedModules.AngularUI.Rendering
{
    public class PluginViewOptionBuilder : IViewOptionsBuilder
    {
        readonly IMemoryCache _memoryCache;
        readonly IEngineFeaturesManager _engineFeaturesManager;
        readonly IHostingEnvironment _hostingEnvironment;
        readonly ISiteService _siteService;
        readonly ILogger _logger;

        public PluginViewOptionBuilder(
            IMemoryCache memoryCache,
            IEngineFeaturesManager engineFeaturesManager,
            IHostingEnvironment hostingEnvironment,
            ISiteService siteService,
            ILogger<AllViewOptionBuilder> logger)
        {
            _memoryCache = memoryCache;
            _engineFeaturesManager = engineFeaturesManager;
            _hostingEnvironment = hostingEnvironment;
            _siteService = siteService;
            _logger = logger;
        }

        public async Task<string> Build(RouteData routeData)
        {
            var cacheKey = BuildCacheKey(routeData);
            if (!_memoryCache.TryGetValue(cacheKey, out string optionString))
            {
                var options = new JObject();
                (await GetViewOptionsAsync(routeData)).ToList().ForEach(options.Merge);
                optionString = options.ToString();
                _memoryCache.Set(cacheKey, optionString);
            }
            return await Task.FromResult(optionString);
        }

        private string BuildCacheKey(RouteData routeData)
        {
            var keyBuilder = new StringBuilder();
            foreach (var key in routeData.Values.Keys)
            {
                keyBuilder.AppendFormat("_{0}.{1}", key, routeData.Values[key]);
            }
            return keyBuilder.ToString();
        }

        private async Task<IEnumerable<JObject>> GetViewOptionsAsync(RouteData routeData)
        {
            var routeReference = _siteService.GetSiteInfoAsync()
                .GetAwaiter()
                .GetResult()
                .As<IEnumerable<RouteViewReference>>("RouteReferences")
                .FirstOrDefault(e =>
                {
                    return string.Join("/", routeData.Values.Select(r => r.Value).ToArray()).Equals(e.Route);
                });

            var plugins = new Dictionary<string, IPluginInfo>();
            _engineFeaturesManager.GetEnabledFeaturesAsync()
                .GetAwaiter()
                .GetResult()
                .ToList()
                .ForEach(feature =>
                {
                    if (!plugins.ContainsKey(feature.Plugin.Id))
                    {
                        plugins.Add(feature.Plugin.Id, feature.Plugin);
                    }
                });
            var options = await plugins.Values.InvokeAsync(descriptor => GetViewOptions(descriptor), _logger);
            if (routeReference != null && routeReference.References != null)
            {
                options = options.Concat(new[] { new JObject { { "requires", new JArray { routeReference.References } } } });
            }
            return options;
        }

        protected virtual Task<IEnumerable<JObject>> GetViewOptions(IPluginInfo pluginInfo)
        {
            var options = new List<JObject>();

            var optionFiles = _hostingEnvironment.ContentRootFileProvider.GetDirectoryContents(pluginInfo.Path)
                .Where(e => e.IsDirectory)
                .SelectMany(e => Directory.GetFiles(e.PhysicalPath, "options.json", SearchOption.AllDirectories));

            if (optionFiles.Any())
            {
                options.AddRange(optionFiles.Select(optionFile =>
                {
                    using (var jsonReader = new JsonTextReader(new StreamReader(File.OpenRead(optionFile))))
                    {
                        return JObject.Load(jsonReader);
                    }
                }));
            }

            return Task.FromResult<IEnumerable<JObject>>(options);
        }
    }
}