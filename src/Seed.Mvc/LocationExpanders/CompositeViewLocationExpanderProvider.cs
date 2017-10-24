using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.AspNetCore.Mvc.Razor;
using Microsoft.Extensions.DependencyInjection;
using System.Linq;

namespace Seed.Mvc.LocationExpanders
{
    public class CompositeViewLocationExpanderProvider : IViewLocationExpanderProvider
    {
        public int Priority => throw new NotSupportedException();

        public IEnumerable<string> ExpandViewLocations(ViewLocationExpanderContext context, IEnumerable<string> viewLocations)
        {
            FindProviders(context)
                .OrderBy(provider => provider.Priority)
                .ToList()
                .ForEach(provider =>
                {
                    viewLocations = provider.ExpandViewLocations(context, viewLocations);
                });
            return viewLocations;
        }

        public void PopulateValues(ViewLocationExpanderContext context)
        {
            FindProviders(context)
                .OrderBy(provider => provider.Priority)
                .ToList()
                .ForEach(provider =>
                {
                    provider.PopulateValues(context);
                });
        }

        private IEnumerable<IViewLocationExpanderProvider> FindProviders(ViewLocationExpanderContext context)
        {
            return context.ActionContext.HttpContext.RequestServices.GetServices<IViewLocationExpanderProvider>();
        }
    }
}
