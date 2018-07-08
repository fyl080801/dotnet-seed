using Microsoft.AspNetCore.Hosting;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Seed.Plugins;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace SeedModules.AngularUI.Rendering
{
    public class ViewOptionLoader : IViewOptionLoader
    {
        readonly IHostingEnvironment _hostingEnvironment;

        public ViewOptionLoader(IHostingEnvironment hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
        }

        public Task<IEnumerable<JObject>> LoadAsync(IPluginInfo pluginInfo)
        {
            var options = new List<JObject>();

            var optionDirectory = _hostingEnvironment.ContentRootFileProvider.GetDirectoryContents(pluginInfo.SubPath)
                .Where(e => e.IsDirectory);
            var optionFiles = optionDirectory.SelectMany(e => Directory.GetFiles(e.PhysicalPath, "options.json", SearchOption.AllDirectories));

            options.AddRange(optionFiles.Select(optionFile =>
            {
                using (var jsonReader = new JsonTextReader(new StreamReader(File.OpenRead(optionFile))))
                {
                    return JObject.Load(jsonReader);
                }
            }));

            if (!_hostingEnvironment.IsDevelopment())
            {
                var optionDistFiles = optionDirectory.SelectMany(e => Directory.GetFiles(e.PhysicalPath, "options.dist.json", SearchOption.AllDirectories));
                options.AddRange(optionDistFiles.Select(optionFile =>
                {
                    using (var jsonReader = new JsonTextReader(new StreamReader(File.OpenRead(optionFile))))
                    {
                        return JObject.Load(jsonReader);
                    }
                }));
            }

            return Task.FromResult<IEnumerable<JObject>>(options);
        }
    }
}