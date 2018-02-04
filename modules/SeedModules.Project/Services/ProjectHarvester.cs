using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
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
        private readonly IOptions<ProjectHarvestingOptions> _projectOptions;

        ILogger _logger;

        public ProjectHarvester(
            IPluginManager pluginManager,
            IHostingEnvironment hostingEnvironment,
            IOptions<ProjectHarvestingOptions> projectOptions,
            ILogger<ProjectHarvester> logger)
        {
            _pluginManager = pluginManager;
            _hostingEnvironment = hostingEnvironment;
            _projectOptions = projectOptions;
            _logger = logger;
        }

        public Task<IEnumerable<ProjectDescriptor>> HarvestProjectsAsync()
        {
            return _pluginManager.GetPlugins().InvokeAsync(descriptor => HarvestProjects(descriptor), _logger);
        }

        private Task<IEnumerable<ProjectDescriptor>> HarvestProjects(IPluginInfo plugin)
        {
            var folderSubPath = Path.Combine(plugin.Path, "Projects");
            return HarvestProjectsAsync(folderSubPath, _projectOptions.Value, _hostingEnvironment);
        }

        public static Task<IEnumerable<ProjectDescriptor>> HarvestProjectsAsync(string path, ProjectHarvestingOptions options, IHostingEnvironment hostingEnvironment)
        {
            var projectContainerFileInfo = hostingEnvironment
                .ContentRootFileProvider
                .GetFileInfo(path);

            var projectDescriptors = new List<ProjectDescriptor>();

            var projectFiles = hostingEnvironment.ContentRootFileProvider.GetDirectoryContents(path)
                .Where(x => !x.IsDirectory && x.Name.EndsWith(".project.json"));

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
                                var projectDescriptor = new JsonSerializer().Deserialize<ProjectDescriptor>(jsonReader);
                                projectDescriptor.ProjectFileInfo = projectFile;
                                return projectDescriptor;
                            }
                        }
                    }
                }));
            }

            return Task.FromResult<IEnumerable<ProjectDescriptor>>(projectDescriptors);
        }
    }
}
