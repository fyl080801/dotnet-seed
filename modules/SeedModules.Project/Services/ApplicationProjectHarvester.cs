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
        private readonly IPluginManager _pluginManager;
        private readonly IHostingEnvironment _hostingEnvironment;
        private readonly IOptions<ProjectHarvestingOptions> _projectOptions;

        public ApplicationProjectHarvester(
            IPluginManager pluginManager,
            IHostingEnvironment hostingEnvironment,
            IOptions<ProjectHarvestingOptions> projectOptions)
        {
            _pluginManager = pluginManager;
            _hostingEnvironment = hostingEnvironment;
            _projectOptions = projectOptions;
        }

        public Task<IEnumerable<ProjectDescriptor>> HarvestProjectsAsync()
        {
            return ProjectHarvester.HarvestProjectsAsync("Projects", _projectOptions.Value, _hostingEnvironment);
        }
    }
}
