using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.FileProviders;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Seed.Environment.Plugins;
using Seed.Modules.Exceptions;
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

        public async Task<IEnumerable<JObject>> LoadAsync(IPluginInfo pluginInfo)
        {
            var options = new List<JObject>();
            var optionFiles = await SearchFile(pluginInfo.SubPath, !_hostingEnvironment.IsDevelopment() ? new[] { "options.json", "options.dist.json" } : new[] { "options.json" });
            //var optionDirectory = _hostingEnvironment.ContentRootFileProvider.GetDirectoryContents(pluginInfo.SubPath);
            //.Where(e => e.IsDirectory);
            // var optionFiles = optionDirectory.SelectMany(e => Directory.GetFiles(e.PhysicalPath, "options.json", SearchOption.AllDirectories));

            options.AddRange(optionFiles.Select(optionFile =>
            {
                using (var jsonReader = new JsonTextReader(new StreamReader(optionFile.CreateReadStream())))
                {
                    return JObject.Load(jsonReader);
                }
            }));

            return options;
        }

        public async Task<IEnumerable<IFileInfo>> SearchFile(string path, string[] names)
        {
            var contents = _hostingEnvironment.ContentRootFileProvider.GetDirectoryContents(path);
            var paths = contents.Where(e => e.IsDirectory);
            var files = contents.Where(e => !e.IsDirectory);

            var fileResult = await files.InvokeAsync(file =>
            {
                if (names.Contains(file.Name))
                {
                    return Task.FromResult(file);
                }
                return Task.FromResult<IFileInfo>(null);
            }, null);

            var pathResult = await paths.InvokeAsync(e => SearchFile(Path.Combine(path, e.Name), names), null);

            return fileResult.Concat(pathResult).Where(e => e != null);
        }
    }
}