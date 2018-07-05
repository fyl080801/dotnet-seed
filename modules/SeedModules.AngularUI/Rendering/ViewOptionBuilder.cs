using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json.Linq;
using Seed.Environment.Engine.Extensions;
using Seed.Modules.Site;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SeedModules.AngularUI.Rendering
{
    public abstract class ViewOptionBuilder : IViewOptionsBuilder
    {
        readonly ISiteService _siteService;
        readonly IHostingEnvironment _hostingEnvironment;
        readonly IEnumerable<IRouteReferenceProvider> _routeReferenceProviders;
        readonly ILogger _logger;

        public ViewOptionBuilder(
            ISiteService siteService,
            IHostingEnvironment hostingEnvironment,
            IEnumerable<IRouteReferenceProvider> routeReferenceProviders,
            ILogger<IViewOptionsBuilder> logger) : this(hostingEnvironment, routeReferenceProviders, logger)
        {
            _siteService = siteService;
        }

        public ViewOptionBuilder(
            IHostingEnvironment hostingEnvironment,
            IEnumerable<IRouteReferenceProvider> routeReferenceProviders,
            ILogger<IViewOptionsBuilder> logger)
        {
            _hostingEnvironment = hostingEnvironment;
            _routeReferenceProviders = routeReferenceProviders;
            _logger = logger;
        }

        public virtual async Task<string> Build(RouteData routeData)
        {
            var options = new JObject();
            if (_siteService != null)
            {
                options["hash"] = (await _siteService.GetSiteInfoAsync()).PageHash ?? string.Empty;
            }

            (await GetViewOptionsAsync(routeData)).ToList().ForEach(options.Merge);

            var requireOptions = Enumerable.Empty<JObject>();
            var requires = await (await _routeReferenceProviders.InvokeAsync(pro => Task.FromResult(pro.GetViewReferences()), _logger))
                .Where(e => e.Route.Split('/').Intersect(routeData.Values.Select(r => r.Value).ToArray()).Count() == e.Route.Split('/').Length)
                .InvokeAsync(route => Task.FromResult(route.References), _logger);

            if (requires.Count() > 0)
            {
                requireOptions = requireOptions.Concat(new[] { new JObject { { "requires", new JArray { requires } } } });
            }
            requireOptions.ToList().ForEach(options.Merge);

            // 已发布的不进行脚本调试
            if (_hostingEnvironment.IsProduction())
            {
                foreach (var child in options["configs"].Children())
                {
                    var nodeName = ((JProperty)child).Name;
                    var currentNode = options["configs"][nodeName];
                    if (currentNode["noDebug"] == null || currentNode["noDebug"].ToObject<bool>() == false)
                    {
                        options["configs"][nodeName]["path"] = options["configs"][nodeName]["path"] + ".min";
                    }
                }
            }

            return options.ToString();
        }

        protected abstract Task<IEnumerable<JObject>> GetViewOptionsAsync(RouteData routeData);
    }
}