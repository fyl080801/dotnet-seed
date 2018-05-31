using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json.Linq;
using Seed.Environment.Engine.Extensions;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SeedModules.AngularUI.Rendering
{
    public abstract class ViewOptionBuilder : IViewOptionsBuilder
    {
        readonly IHostingEnvironment _hostingEnvironment;
        readonly IEnumerable<IRouteReferenceProvider> _routeReferenceProviders;
        readonly ILogger _logger;

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
            (await GetViewOptionsAsync(routeData)).ToList().ForEach(options.Merge);

            var requireOptions = Enumerable.Empty<JObject>();
            var requires = await (await _routeReferenceProviders.InvokeAsync(pro => Task.FromResult(pro.GetViewReferences()), _logger))
                .Where(e => e.Route == string.Join("/", routeData.Values.Select(r => r.Value).ToArray()))
                .InvokeAsync(route => Task.FromResult(route.References), _logger);

            if (requires.Count() > 0)
            {
                requireOptions = requireOptions.Concat(new[] { new JObject { { "requires", new JArray { requires } } } });
            }
            requireOptions.ToList().ForEach(options.Merge);

            return options.ToString();
        }

        protected abstract Task<IEnumerable<JObject>> GetViewOptionsAsync(RouteData routeData);
    }
}