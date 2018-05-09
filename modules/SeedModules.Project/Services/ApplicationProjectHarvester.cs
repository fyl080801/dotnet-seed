using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Options;
using Seed.Plugins;
using SeedModules.Project.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SeedModules.Project.Services
{
    public class ApplicationProjectHarvester : IProjectHarvester
    {
        readonly IPluginManager _pluginManager;
        readonly IHostingEnvironment _hostingEnvironment;
        readonly IOptions<ProjectHarvestingOptions> _projectOptions;
        readonly IProjectReader _projectReader;

        public ApplicationProjectHarvester(
            IPluginManager pluginManager,
            IHostingEnvironment hostingEnvironment,
            IOptions<ProjectHarvestingOptions> projectOptions,
            IProjectReader projectReader)
        {
            _pluginManager = pluginManager;
            _hostingEnvironment = hostingEnvironment;
            _projectOptions = projectOptions;
            _projectReader = projectReader;
        }

        public Task<IEnumerable<ProjectDescriptor>> HarvestProjectsAsync()
        {
            return ProjectHarvester.HarvestProjectsAsync("Projects", _projectOptions.Value, _hostingEnvironment, _projectReader);
        }
    }
}
