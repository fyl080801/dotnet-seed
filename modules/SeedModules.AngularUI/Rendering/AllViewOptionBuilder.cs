using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Seed.Environment.Engine.Extensions;
using Seed.Plugins;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace SeedModules.AngularUI.Rendering
{
    public class AllViewOptionBuilder : IViewOptionsBuilder
    {
        readonly IPluginManager _pluginManager;
        readonly IHostingEnvironment _hostingEnvironment;
        readonly ILogger _logger;

        public AllViewOptionBuilder(
            IPluginManager pluginManager,
            IHostingEnvironment hostingEnvironment,
            ILogger<AllViewOptionBuilder> logger)
        {
            _pluginManager = pluginManager;
            _hostingEnvironment = hostingEnvironment;
            _logger = logger;
        }

        public async Task<string> Build(RouteData routeData)
        {
            var options = new JObject();
            GetViewReferencesAsync().GetAwaiter().GetResult()
                .ToList()
                .ForEach(option =>
                {
                    options.Merge(option);
                });

            return await Task.FromResult(options.ToString());
        }

        private Task<IEnumerable<JObject>> GetViewReferencesAsync()
        {
            return _pluginManager.GetPlugins().InvokeAsync(descriptor => GetViewOptions(descriptor), _logger);
        }

        protected virtual Task<IEnumerable<JObject>> GetViewOptions(IPluginInfo pluginInfo)
        {
            var options = new List<JObject>();

            var optionFiles = _hostingEnvironment.ContentRootFileProvider.GetDirectoryContents(pluginInfo.Path)
                .Where(e => e.IsDirectory)
                .SelectMany(e => Directory.GetFiles(e.PhysicalPath, "options.json", SearchOption.AllDirectories));

            if (optionFiles.Any())
            {
                options.AddRange(optionFiles.Select(optionFile =>
                {
                    using (var jsonReader = new JsonTextReader(new StreamReader(File.OpenRead(optionFile))))
                    {
                        var option = JObject.Load(jsonReader);
                        if (_hostingEnvironment.IsDevelopment() && option.ContainsKey("configs"))
                        {
                            option.GetValue("configs").Where(e =>
                            {
                                var name = e.GetType().GetProperty("Name").GetValue(e).ToString();
                                return name.StartsWith(pluginInfo.Id + "/") && (name.EndsWith("/requires") || name.EndsWith("/module"));
                            })
                                .ToList()
                                .ForEach(e => e.Remove());
                        }
                        return option;
                    }
                }));
            }

            return Task.FromResult<IEnumerable<JObject>>(options);
        }
    }
}