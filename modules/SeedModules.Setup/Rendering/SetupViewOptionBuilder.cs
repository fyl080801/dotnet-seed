using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json.Linq;
using Seed.Environment.Engine.Extensions;
using Seed.Modules.Site;
using Seed.Plugins;
using SeedModules.AngularUI.Rendering;

namespace SeedModules.Setup.Rendering
{
    public class SetupViewOptionBuilder : AllViewOptionBuilder
    {
        // public SetupViewOptionBuilder(
        //     IPluginManager pluginManager,
        //     IHostingEnvironment hostingEnvironment,
        //     ILogger<AllViewOptionBuilder> logger)
        //     : base(pluginManager, hostingEnvironment, logger)
        // {
        // }

        // protected override Task<IEnumerable<JObject>> GetViewOptions(IPluginInfo pluginInfo)
        // {
        //     if (pluginInfo.Id != "SeedModules.Setup" && pluginInfo.Id != "SeedModules.AngularUI")
        //         return Task.FromResult<IEnumerable<JObject>>(new List<JObject>());

        //     return base.GetViewOptions(pluginInfo);
        // }
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

        // protected override async Task<IEnumerable<IPluginInfo>> GetPluginsAsync(RouteData routeData)
        // {
        //     return (await base.GetPluginsAsync(routeData))
        //         .Where(e => e.Id == "SeedModules.Setup" || e.Id == "SeedModules.AngularUI")
        //         .AsEnumerable();
        // }
    }
}