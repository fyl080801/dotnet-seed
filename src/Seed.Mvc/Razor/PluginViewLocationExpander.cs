using Microsoft.AspNetCore.Mvc.Razor;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Seed.Mvc.Razor
{
    public class PluginViewLocationExpander : IViewLocationExpander
    {
        string _pluginPath;

        public PluginViewLocationExpander() : this("/Plugins")
        {

        }

        public PluginViewLocationExpander(string pluginPath)
        {
            _pluginPath = pluginPath;
        }

        /// <inheritdoc />
        public void PopulateValues(ViewLocationExpanderContext context)
        {
        }

        /// <inheritdoc />
        public virtual IEnumerable<string> ExpandViewLocations(
            ViewLocationExpanderContext context,
            IEnumerable<string> viewLocations)
        {
            var result = new List<string>();
            result.Add(_pluginPath + "/{2}/Views/{1}/{0}.cshtml");
            result.Add(_pluginPath + "/{2}/Views/Shared/{0}.cshtml");

            result.AddRange(viewLocations);

            return result;
        }
    }
}
