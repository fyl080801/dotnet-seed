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
        readonly IPluginManager _pluginManager;
        readonly IHostingEnvironment _hostingEnvironment;
        readonly IOptions<ProjectHarvestingOptions> _projectOptions;
        readonly IProjectReader _projectReader;

        ILogger _logger;

        public ProjectHarvester(
            IPluginManager pluginManager,
            IHostingEnvironment hostingEnvironment,
            IOptions<ProjectHarvestingOptions> projectOptions,
            IProjectReader projectReader,
            ILogger<ProjectHarvester> logger)
        {
            _pluginManager = pluginManager;
            _hostingEnvironment = hostingEnvironment;
            _projectOptions = projectOptions;
            _projectReader = projectReader;
            _logger = logger;
        }

        public Task<IEnumerable<ProjectDescriptor>> HarvestProjectsAsync()
        {
            return _pluginManager.GetPlugins().InvokeAsync(descriptor => HarvestProjects(descriptor), _logger);
        }

        private Task<IEnumerable<ProjectDescriptor>> HarvestProjects(IPluginInfo plugin)
        {
            var folderSubPath = Path.Combine(plugin.Path, "Projects");
            return HarvestProjectsAsync(folderSubPath, _projectOptions.Value, _hostingEnvironment, _projectReader);
        }

        public static Task<IEnumerable<ProjectDescriptor>> HarvestProjectsAsync(string path, ProjectHarvestingOptions options, IHostingEnvironment hostingEnvironment, IProjectReader projectReader)
        {
            var projectContainerFileInfo = hostingEnvironment
                .ContentRootFileProvider
                .GetFileInfo(path);

            var projectDescriptors = new List<ProjectDescriptor>();

            var projectFiles = hostingEnvironment.ContentRootFileProvider.GetDirectoryContents(path)
                .Where(x => !x.IsDirectory && x.Name.EndsWith(".project.json"));

            if (projectFiles.Any())
            {
                projectDescriptors.AddRange(projectFiles.Select(projectReader.ReadDescriptor));
            }

            return Task.FromResult<IEnumerable<ProjectDescriptor>>(projectDescriptors);
        }
    }
}
