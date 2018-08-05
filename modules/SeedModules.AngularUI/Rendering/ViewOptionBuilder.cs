using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json.Linq;
using Seed.Modules.Exceptions;
using Seed.Mvc.Settings;
using SeedModules.AngularUI.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SeedModules.AngularUI.Rendering
{
    public abstract class ViewOptionBuilder : IViewOptionsBuilder
    {
        readonly ISiteService _siteService;
        readonly IHostingEnvironment _hostingEnvironment;
        readonly ILogger _logger;

        public ViewOptionBuilder(
            ISiteService siteService,
            IHostingEnvironment hostingEnvironment,
            ILogger<IViewOptionsBuilder> logger) : this(hostingEnvironment, logger)
        {
            _siteService = siteService;
        }

        public ViewOptionBuilder(
            IHostingEnvironment hostingEnvironment,
            ILogger<IViewOptionsBuilder> logger)
        {
            _hostingEnvironment = hostingEnvironment;
            _logger = logger;
        }

        public virtual async Task<string> Build(ControllerContext controllerContext, RouteData routeData)
        {
            var options = new JObject();
            if (_siteService != null)
            {
                options["hash"] = (await _siteService.GetSiteInfoAsync()).PageHash ?? string.Empty;
            }

            (await GetViewOptionsAsync(routeData)).ToList().ForEach(options.Merge);

            var requireOptions = Enumerable.Empty<JObject>();
            var requires = new List<string>();

            controllerContext.ActionDescriptor.MethodInfo.GetCustomAttributes(typeof(RouteRequiresAttribute), false)
                .Select(e => e as RouteRequiresAttribute)
                .ToList()
                .ForEach(e => requires.AddRange(e.Requires));

            requires.AddRange(await (await controllerContext.HttpContext.RequestServices.GetServices<IRouteReferenceProvider>().InvokeAsync(pro => Task.FromResult(pro.GetViewReferences()), _logger))
                .Where(e => e.Route.Split('/').Intersect(routeData.Values.Select(r => r.Value).ToArray()).Count() == e.Route.Split('/').Length)
                .InvokeAsync(route => Task.FromResult(route.References), _logger));

            if (requires.Count() > 0)
            {
                requireOptions = requireOptions.Concat(new[]
                {
                    new JObject
                    {
                        { "requires", new JArray { requires.Distinct().ToArray() } }
                    }
                });
            }
            requireOptions.ToList().ForEach(options.Merge);

            // 已发布的不进行脚本调试
            if (_hostingEnvironment.IsProduction())
            {
                foreach (var child in options["configs"].Children())
                {
                    var nodeName = ((JProperty)child).Name;
                    var currentNode = options["configs"][nodeName];
                    if (currentNode["path"] != null && (currentNode["noDebug"] == null || currentNode["noDebug"].ToObject<bool>() == false))
                    {
                        options["configs"][nodeName]["path"] = currentNode["path"] + ".min";
                    }
                }
            }

            return options.ToString();
        }

        protected abstract Task<IEnumerable<JObject>> GetViewOptionsAsync(RouteData routeData);
    }
}