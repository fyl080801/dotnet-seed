using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Seed.Environment.Engine.Extensions;
using Seed.Plugins;
using SeedModules.Project.Models;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace SeedModules.Project.Services
{
    public class ProjectHarvester : IProjectHarvester
    {
        private readonly IPluginManager _pluginManager;
        private readonly IHostingEnvironment _hostingEnvironment;

        public ProjectHarvester(
            IPluginManager extensionManager,
            IHostingEnvironment hostingEnvironment,
            ILogger<ProjectHarvester> logger)
        {
            _pluginManager = extensionManager;
            _hostingEnvironment = hostingEnvironment;

            Logger = logger;
        }

        public ILogger Logger { get; set; }

        public Task<IEnumerable<ProjectDescriptor>> HarvestProjectsAsync()
        {
            return _pluginManager.GetPlugins().InvokeAsync(descriptor => HarvestProjectss(descriptor), Logger);
        }

        private Task<IEnumerable<ProjectDescriptor>> HarvestProjectss(IPluginInfo extension)
        {
            var folderSubPath = Path.Combine(extension.SubPath, "Projects");
            return HarvestProjectsAsync(folderSubPath, _hostingEnvironment);
        }

        public static Task<IEnumerable<ProjectDescriptor>> HarvestProjectsAsync(string path, IHostingEnvironment hostingEnvironment)
        {
            var recipeContainerFileInfo = hostingEnvironment
                .ContentRootFileProvider
                .GetFileInfo(path);

            var projectDescriptors = new List<ProjectDescriptor>();

            var projectFiles = hostingEnvironment.ContentRootFileProvider.GetDirectoryContents(path)
                .Where(x => !x.IsDirectory && x.Name.EndsWith(".projects.json"));

            if (projectFiles.Any())
            {
                projectDescriptors.AddRange(projectFiles.Select(projectFile =>
                {
                    using (var stream = projectFile.CreateReadStream())
                    {
                        using (var reader = new StreamReader(stream))
                        {
                            using (var jsonReader = new JsonTextReader(reader))
                            {
                                var serializer = new JsonSerializer();
                                var recipeDescriptor = serializer.Deserialize<ProjectDescriptor>(jsonReader);
                                recipeDescriptor.FileProvider = hostingEnvironment.ContentRootFileProvider;
                                recipeDescriptor.BasePath = path;
                                recipeDescriptor.ProjectFileInfo = projectFile;

                                return recipeDescriptor;
                            }
                        }
                    }
                }));
            }

            return Task.FromResult<IEnumerable<ProjectDescriptor>>(projectDescriptors);
        }
    }
}
