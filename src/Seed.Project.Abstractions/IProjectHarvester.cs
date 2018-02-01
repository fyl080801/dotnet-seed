using Seed.Project.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Seed.Project
{
    public interface IProjectHarvester
    {
        Task<IEnumerable<ProjectDescriptor>> HarvestProjectsAsync();
    }
}
