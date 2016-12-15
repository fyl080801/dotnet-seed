using Microsoft.AspNetCore.Mvc.Razor;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Seed.Environment.Plugin;
using System.Collections.Generic;

namespace Seed.Mvc.Razor
{
    public class PluginViewLocationExpander : IViewLocationExpander
    {
        public void PopulateValues(ViewLocationExpanderContext context)
        {
        }

        public virtual IEnumerable<string> ExpandViewLocations(
            ViewLocationExpanderContext context,
            IEnumerable<string> viewLocations)
        {
            var options = context.ActionContext.HttpContext.RequestServices.GetService<IOptions<PluginSettings>>();
            var result = new List<string>();
            result.Add(options.Value.Path + "/{2}/Views/{1}/{0}.cshtml");
            result.Add(options.Value.Path + "/{2}/Views/Shared/{0}.cshtml");

            result.AddRange(viewLocations);

            return result;
        }
    }
}
