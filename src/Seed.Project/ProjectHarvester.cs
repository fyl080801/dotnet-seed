using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Seed.Environment.Engine.Extensions;
using Seed.Plugins;
using Seed.Project.Models;

namespace Seed.Project
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
            var recipeContainerFileInfo = hostingEnvironment
                .ContentRootFileProvider
                .GetFileInfo(path);

            var recipeDescriptors = new List<ProjectDescriptor>();

            var recipeFiles = hostingEnvironment.ContentRootFileProvider.GetDirectoryContents(path)
                .Where(x => !x.IsDirectory && x.Name.EndsWith(".project.json"));

            if (recipeFiles.Any())
            {
                recipeDescriptors.AddRange(recipeFiles.Select(recipeFile =>
                {
                    using (var stream = recipeFile.CreateReadStream())
                    {
                        using (var reader = new StreamReader(stream))
                        {
                            using (var jsonReader = new JsonTextReader(reader))
                            {
                                var serializer = new JsonSerializer();
                                var recipeDescriptor = serializer.Deserialize<ProjectDescriptor>(jsonReader);
                                recipeDescriptor.ProjectFileInfo = recipeFile;
                                return recipeDescriptor;
                            }
                        }
                    }
                }));
            }

            return Task.FromResult<IEnumerable<ProjectDescriptor>>(recipeDescriptors);
        }
    }
}
