﻿using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Routing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Seed.Mvc.Routes
{
    public class PrefixedRouteBuilder : IRouteBuilder
    {
        private readonly IRouteBuilder _baseRouteBuilder;
        private readonly List<IRouter> _routes = new List<IRouter>();
        private readonly string _routePrefix;
        private readonly IInlineConstraintResolver _constraintResolver;

        public PrefixedRouteBuilder(string routePrefix, IRouteBuilder baseRouteBuilder, IInlineConstraintResolver constraintResolver)
        {
            _constraintResolver = constraintResolver;
            _routePrefix = routePrefix;
            _baseRouteBuilder = baseRouteBuilder;
        }
        public IApplicationBuilder ApplicationBuilder
        {
            get
            {
                return _baseRouteBuilder.ApplicationBuilder;
            }
        }

        public IRouter DefaultHandler
        {
            get
            {
                return _baseRouteBuilder.DefaultHandler;
            }

            set
            {
                _baseRouteBuilder.DefaultHandler = value;
            }
        }

        public IList<IRouter> Routes
        {
            get
            {
                return _routes;
            }
        }

        public IServiceProvider ServiceProvider
        {
            get
            {
                return _baseRouteBuilder.ServiceProvider;
            }
        }

        public IRouter Build()
        {
            var routeCollection = new RouteCollection();

            foreach (var entry in Routes)
            {
                if (entry == null)
                {
                    continue;
                }

                var route = entry as Route;
                if (route != null)
                {
                    var constraints = new Dictionary<string, object>();

                    foreach (var kv in route.Constraints)
                    {
                        constraints.Add(kv.Key, kv.Value);
                    }

                    var prefixedRoute = new Route(
                        _baseRouteBuilder.DefaultHandler,
                        route.Name,
                        _routePrefix + route.RouteTemplate,
                        route.Defaults,
                        constraints,
                        route.DataTokens,
                        _constraintResolver);

                    _baseRouteBuilder.Routes.Add(prefixedRoute);
                }
                else
                {
                    _baseRouteBuilder.Routes.Add(entry);
                }
            }

            return _baseRouteBuilder.Build();
        }
    }
}
