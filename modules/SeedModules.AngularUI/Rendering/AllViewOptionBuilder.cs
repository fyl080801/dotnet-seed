using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
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
        readonly IOptions<ViewOptions> _options;
        readonly IPluginManager _pluginManager;
        readonly IHostingEnvironment _hostingEnvironment;
        readonly ILogger _logger;

        public AllViewOptionBuilder(
            IOptions<ViewOptions> options,
            IPluginManager pluginManager,
            IHostingEnvironment hostingEnvironment,
            ILogger<AllViewOptionBuilder> logger)
        {
            _options = options;
            _pluginManager = pluginManager;
            _hostingEnvironment = hostingEnvironment;
            _logger = logger;
        }

        public async Task<string> Build(RouteData routeData)
        {
            var referencies = await GetViewReferencesAsync();
            var defineOptions = new
            {
                app = string.IsNullOrEmpty(_options.Value.App) ? "app.application" : _options.Value.App,
                isDebug = _options.Value.IsDebug,
                urlArgs = _options.Value.UrlArgs,
                references = new Dictionary<string, object>(),
                requires = new List<string>(),
                patchs = new List<string>()
            };

            foreach (var refDefine in referencies)
            {
                foreach (var refItem in refDefine.References)
                {
                    defineOptions.references[refItem.Key] = refItem.Value;
                }
                defineOptions.requires.AddRange(refDefine.Requires);
                defineOptions.patchs.AddRange(refDefine.Patchs);
            }

            return await Task.FromResult(JsonConvert.SerializeObject(defineOptions));
        }

        private Task<IEnumerable<ViewReference>> GetViewReferencesAsync()
        {
            return _pluginManager.GetPlugins().InvokeAsync(descriptor => GetViewReferences(descriptor), _logger);
        }

        protected virtual Task<IEnumerable<ViewReference>> GetViewReferences(IPluginInfo pluginInfo)
        {
            var uiFiles = _hostingEnvironment.ContentRootFileProvider.GetDirectoryContents(pluginInfo.Path)
                .Where(x => !x.IsDirectory && x.Name.EndsWith(".ui.json"));
            var uiReferences = new List<ViewReference>();

            if (uiFiles.Any())
            {
                uiReferences.AddRange(uiFiles.Select(uiDefineFile =>
                {
                    using (var fs = uiDefineFile.CreateReadStream())
                    {
                        using (var reader = new StreamReader(fs))
                        {
                            using (var jsonReader = new JsonTextReader(reader))
                            {
                                var ui = new JsonSerializer().Deserialize<ViewReference>(jsonReader);
                                if (_hostingEnvironment.IsDevelopment())
                                {
                                    ui.References = ui.References.Where(e => !e.Value.IsDist).ToDictionary(e => e.Key, e => e.Value);
                                }
                                return ui;
                            }
                        }
                    }
                }));
            }

            return Task.FromResult<IEnumerable<ViewReference>>(uiReferences);
        }
    }
}