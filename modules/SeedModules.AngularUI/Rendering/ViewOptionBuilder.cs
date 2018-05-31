using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Routing;
using Newtonsoft.Json.Linq;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SeedModules.AngularUI.Rendering
{
    public abstract class ViewOptionBuilder : IViewOptionsBuilder
    {
        readonly IHostingEnvironment _hostingEnvironment;

        public ViewOptionBuilder(IHostingEnvironment hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
        }

        public virtual async Task<string> Build(RouteData routeData)
        {
            var options = new JObject();
            (await GetViewOptionsAsync(routeData)).ToList().ForEach(options.Merge);
            return options.ToString();
        }

        protected abstract Task<IEnumerable<JObject>> GetViewOptionsAsync(RouteData routeData);
    }
}