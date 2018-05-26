using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Seed.Environment.Engine.Extensions;
using Seed.Modules.Site;
using Seed.Plugins;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace SeedModules.AngularUI.Rendering
{
    public class AllViewOptionBuilder : ViewOptionBuilder
    {
        readonly IPluginManager _pluginManager;
        readonly IViewOptionLoader _viewOptionLoader;
        readonly ILogger _logger;

        public AllViewOptionBuilder(
            IPluginManager pluginManager,
            IViewOptionLoader viewOptionLoader,
            IHostingEnvironment hostingEnvironment,
            ILogger<IViewOptionsBuilder> logger) : base(hostingEnvironment)
        {
            _pluginManager = pluginManager;
            _viewOptionLoader = viewOptionLoader;
            _logger = logger;
        }

        protected override Task<IEnumerable<JObject>> GetViewOptionsAsync(RouteData routeData)
        {
            return _pluginManager.GetPlugins().InvokeAsync(descriptor => _viewOptionLoader.LoadAsync(descriptor), _logger);
        }

        // protected override Task<IEnumerable<IPluginInfo>> GetPluginsAsync(RouteData routeData)
        // {
        //     return Task.FromResult(_pluginManager.GetPlugins());
        // }

        // public async Task<string> Build(RouteData routeData)
        // {
        //     var options = new JObject();
        //     GetViewReferencesAsync().GetAwaiter().GetResult()
        //         .ToList()
        //         .ForEach(option =>
        //         {
        //             options.Merge(option);
        //         });

        //     return await Task.FromResult(options.ToString());
        // }

        // private Task<IEnumerable<JObject>> GetViewReferencesAsync()
        // {
        //     return _pluginManager.GetPlugins().InvokeAsync(descriptor => GetViewOptions(descriptor), _logger);
        // }

        // protected virtual Task<IEnumerable<JObject>> GetViewOptions(IPluginInfo pluginInfo)
        // {
        //     var options = new List<JObject>();
        //     var optionDirectory = _hostingEnvironment.ContentRootFileProvider.GetDirectoryContents(pluginInfo.Path)
        //         .Where(e => e.IsDirectory);
        //     var optionFiles = optionDirectory.SelectMany(e => Directory.GetFiles(e.PhysicalPath, "options.json", SearchOption.AllDirectories));

        //     options.AddRange(optionFiles.Select(optionFile =>
        //     {
        //         using (var jsonReader = new JsonTextReader(new StreamReader(File.OpenRead(optionFile))))
        //         {
        //             return JObject.Load(jsonReader);
        //         }
        //     }));

        //     if (!_hostingEnvironment.IsDevelopment())
        //     {
        //         var optionDistFiles = optionDirectory.SelectMany(e => Directory.GetFiles(e.PhysicalPath, "options.dist.json", SearchOption.AllDirectories));
        //         options.AddRange(optionDistFiles.Select(optionFile =>
        //         {
        //             using (var jsonReader = new JsonTextReader(new StreamReader(File.OpenRead(optionFile))))
        //             {
        //                 return JObject.Load(jsonReader);
        //             }
        //         }));
        //     }

        //     return Task.FromResult<IEnumerable<JObject>>(options);
        // }
    }
}