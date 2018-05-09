using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Primitives;
using Seed.Modules.Site;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace SeedModules.Router.Routes
{
    public class HomeRoute : Route
    {
        RouteValueDictionary _homeRoute;
        IChangeToken _siteServicechangeToken;

        public HomeRoute(IRouteBuilder routeBuilder, IInlineConstraintResolver inlineConstraintResolver)
            : base(routeBuilder.DefaultHandler, "", inlineConstraintResolver)
        {
        }

        protected override async Task OnRouteMatched(RouteContext context)
        {
            var tokens = GetHomeRouteValues(context.HttpContext);

            if (tokens != null)
            {
                foreach (var entry in tokens)
                {
                    context.RouteData.Values[entry.Key] = entry.Value;
                }
            }

            await base.OnRouteMatched(context);
        }

        public override VirtualPathData GetVirtualPath(VirtualPathContext context)
        {
            object value;

            var tokens = GetHomeRouteValues(context.HttpContext);

            if (tokens == null)
            {
                return null;
            }

            foreach (var entry in tokens)
            {
                if (String.Equals(entry.Key, "area", StringComparison.OrdinalIgnoreCase))
                {
                    if (!context.AmbientValues.TryGetValue("area", out value) || !String.Equals(value.ToString(), tokens["area"].ToString(), StringComparison.OrdinalIgnoreCase))
                    {
                        return null;
                    }
                }
                else
                {
                    if (!context.Values.TryGetValue(entry.Key, out value) || !String.Equals(value.ToString(), entry.Value.ToString(), StringComparison.OrdinalIgnoreCase))
                    {
                        return null;
                    }
                }
            }

            foreach (var key in tokens.Keys)
            {
                context.Values.Remove(key);
            }

            var result = base.GetVirtualPath(context);

            return result;
        }

        private RouteValueDictionary GetHomeRouteValues(HttpContext httpContext)
        {
            if (_siteServicechangeToken == null || _siteServicechangeToken.HasChanged)
            {
                var siteService = httpContext.RequestServices.GetRequiredService<ISiteService>();
                var site = siteService.GetSiteInfoAsync().GetAwaiter().GetResult();
                if (site == null) return null;

                _homeRoute = site.HomeRoute;
                _siteServicechangeToken = siteService.ChangeToken;
            }

            return _homeRoute;
        }
    }
}
