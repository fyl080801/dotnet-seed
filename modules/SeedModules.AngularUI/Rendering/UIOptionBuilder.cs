using Microsoft.Extensions.Options;
using System.Collections;
using System.Collections.Generic;
using Seed.Plugins;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Seed.Environment.Engine.Extensions;
using Microsoft.AspNetCore.Hosting;
using System.Linq;
using System.IO;
using Newtonsoft.Json;

namespace SeedModules.AngularUI.Rendering
{
    public class UIOptionBuilder : IUIOptionsBuilder
    {
        readonly IOptions<UIOptions> _options;
        readonly IPluginManager _pluginManager;
        readonly IHostingEnvironment _hostingEnvironment;
        readonly ILogger _logger;

        public UIOptionBuilder(
            IOptions<UIOptions> options,
            IPluginManager pluginManager,
            IHostingEnvironment hostingEnvironment,
            ILogger<UIOptionBuilder> logger)
        {
            _options = options;
            _pluginManager = pluginManager;
            _hostingEnvironment = hostingEnvironment;
            _logger = logger;
        }

        public async Task<string> Build()
        {
            var referencies = await GetUIReferencesAsync();
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

        private Task<IEnumerable<UIReference>> GetUIReferencesAsync()
        {
            return _pluginManager.GetPlugins().InvokeAsync(descriptor => GetUIReferences(descriptor), _logger);
        }

        private Task<IEnumerable<UIReference>> GetUIReferences(IPluginInfo pluginInfo)
        {
            var uiFlag = _hostingEnvironment.IsDevelopment() ? "dev" : "dist";
            var uiFiles = _hostingEnvironment.ContentRootFileProvider.GetDirectoryContents(pluginInfo.Path)
                .Where(x => !x.IsDirectory && x.Name.EndsWith($".ui.{uiFlag}.json"));
            var uiReferences = new List<UIReference>();

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
                                return new JsonSerializer().Deserialize<UIReference>(jsonReader);
                            }
                        }
                    }
                }));
            }

            return Task.FromResult<IEnumerable<UIReference>>(uiReferences);
        }
    }
}