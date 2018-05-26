using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json.Linq;
using Seed.Data.Extensions;
using Seed.Environment.Engine;
using Seed.Environment.Engine.Extensions;
using Seed.Modules.Site;
using Seed.Plugins;
using SeedModules.AngularUI.Models;

namespace SeedModules.AngularUI.Rendering
{
    public class PluginViewOptionBuilder : ViewOptionBuilder
    {
        readonly IViewOptionLoader _viewOptionsLoader;
        readonly IMemoryCache _memoryCache;
        readonly IEngineFeaturesManager _engineFeaturesManager;
        readonly IHostingEnvironment _hostingEnvironment;
        readonly ISiteService _siteService;
        readonly ILogger _logger;

        public PluginViewOptionBuilder(
            IViewOptionLoader viewOptionsLoader,
            IMemoryCache memoryCache,
            IEngineFeaturesManager engineFeaturesManager,
            IHostingEnvironment hostingEnvironment,
            ISiteService siteService,
            ILogger<IViewOptionsBuilder> logger) : base(hostingEnvironment)
        {
            _viewOptionsLoader = viewOptionsLoader;
            _memoryCache = memoryCache;
            _engineFeaturesManager = engineFeaturesManager;
            _hostingEnvironment = hostingEnvironment;
            _siteService = siteService;
            _logger = logger;
        }

        public override async Task<string> Build(RouteData routeData)
        {
            if (!_hostingEnvironment.IsDevelopment())
            {
                return await base.Build(routeData);
            }
            else
            {
                var cacheKey = BuildCacheKey(routeData);
                if (!_memoryCache.TryGetValue(cacheKey, out string optionString))
                {
                    optionString = await base.Build(routeData);
                    _memoryCache.Set(cacheKey, optionString);
                }
                return optionString;
            }
        }

        protected override async Task<IEnumerable<JObject>> GetViewOptionsAsync(RouteData routeData)
        {
            var routeReference = _siteService.GetSiteInfoAsync()
                .GetAwaiter()
                .GetResult()
                .As<IEnumerable<RouteViewReference>>("RouteReferences")
                .FirstOrDefault(e =>
                {
                    return string.Join("/", routeData.Values.Select(r => r.Value).ToArray()).Equals(e.Route);
                });
            var options = await (await GetPluginsAsync(routeData)).InvokeAsync(descriptor => _viewOptionsLoader.LoadAsync(descriptor), _logger);
            if (routeReference != null && routeReference.References != null)
            {
                options = options.Concat(new[] { new JObject { { "requires", new JArray { routeReference.References } } } });
            }
            return options;
        }

        private Task<IEnumerable<IPluginInfo>> GetPluginsAsync(RouteData routeData)
        {
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
            return Task.FromResult(plugins.Values.AsEnumerable());
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
    }
}