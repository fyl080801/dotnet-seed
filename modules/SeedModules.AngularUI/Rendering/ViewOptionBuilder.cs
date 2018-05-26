using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Seed.Data.Extensions;
using Seed.Environment.Engine;
using Seed.Environment.Engine.Extensions;
using Seed.Modules.Site;
using Seed.Plugins;
using Seed.Plugins.Feature;
using SeedModules.AngularUI.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
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

        // protected virtual async Task<IEnumerable<JObject>> GetViewOptionsAsync(RouteData routeData)
        // {

        // }

        // protected virtual Task<IEnumerable<IPluginInfo>> GetPluginsAsync(RouteData routeData)
        // {
        //     var plugins = new Dictionary<string, IPluginInfo>();
        //     _engineFeaturesManager.GetEnabledFeaturesAsync()
        //        .GetAwaiter()
        //        .GetResult()
        //        .ToList()
        //        .ForEach(feature =>
        //        {
        //            if (!plugins.ContainsKey(feature.Plugin.Id))
        //            {
        //                plugins.Add(feature.Plugin.Id, feature.Plugin);
        //            }
        //        });
        //     return Task.FromResult(plugins.Values.AsEnumerable());
        // }

        // protected Task<IEnumerable<JObject>> LoadAsync(IPluginInfo pluginInfo)
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
        //             // var option = JObject.Load(jsonReader);
        //             // if (_hostingEnvironment.IsDevelopment() && option.ContainsKey("configs"))
        //             // {
        //             //     option.GetValue("configs").Where(e =>
        //             //     {
        //             //         var name = e.GetType().GetProperty("Name").GetValue(e).ToString();
        //             //         return name.StartsWith(pluginInfo.Id + "/") && (name.EndsWith("/requires") || name.EndsWith("/module"));
        //             //     })
        //             //         .ToList()
        //             //         .ForEach(e => e.Remove());
        //             // }
        //             // return option;
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

        //protected abstract Task<IEnumerable<IPluginInfo>> GetPluginsAsync(RouteData routeData);
    }
}