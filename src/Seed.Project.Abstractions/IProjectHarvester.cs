using Seed.Project.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Seed.Project
{
    public interface IProjectHarvester
    {
        Task<IEnumerable<ProjectDescriptor>> HarvestProjectsAsync();
    }
}
