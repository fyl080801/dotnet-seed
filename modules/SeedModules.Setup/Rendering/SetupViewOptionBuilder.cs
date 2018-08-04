using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json.Linq;
using Seed.Environment.Plugins;
using Seed.Modules.Exceptions;
using SeedModules.AngularUI.Rendering;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SeedModules.Setup.Rendering
{
    public class SetupViewOptionBuilder : AllViewOptionBuilder
    {
        readonly IPluginManager _pluginManager;
        readonly IViewOptionLoader _viewOptionLoader;
        readonly ILogger _logger;

        public SetupViewOptionBuilder(
            IPluginManager pluginManager,
            IViewOptionLoader viewOptionLoader,
            IHostingEnvironment hostingEnvironment,
            ILogger<IViewOptionsBuilder> logger) : base(pluginManager, viewOptionLoader, hostingEnvironment, logger)
        {
            _pluginManager = pluginManager;
            _viewOptionLoader = viewOptionLoader;
            _logger = logger;
        }

        protected override Task<IEnumerable<JObject>> GetViewOptionsAsync(RouteData routeData)
        {
            return _pluginManager.GetPlugins()
                .Where(e => e.Id == "SeedModules.Setup" || e.Id == "SeedModules.AngularUI")
                .InvokeAsync(descriptor => _viewOptionLoader.LoadAsync(descriptor), _logger);
        }
    }
}