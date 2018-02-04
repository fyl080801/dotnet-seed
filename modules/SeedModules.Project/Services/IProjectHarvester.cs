using SeedModules.Project.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SeedModules.Project.Services
{
    public interface IProjectHarvester
    {
        Task<IEnumerable<ProjectDescriptor>> HarvestProjectsAsync();
    }
}
