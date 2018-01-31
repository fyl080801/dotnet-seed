using Seed.Project.Abstractions;
using Seed.Project.Abstractions.Models;
using System;
using System.Threading.Tasks;

namespace SeedModules.Project.Services
{
    public class ProjectStore : IProjectStore
    {
        public Task CreateAsync(ProjectResult projectResult)
        {
            throw new NotImplementedException();
        }

        public Task DeleteAsync(ProjectResult projectResult)
        {
            throw new NotImplementedException();
        }

        public Task<ProjectResult> FindByExecutionIdAsync(string executionId)
        {
            throw new NotImplementedException();
        }

        public Task UpdateAsync(ProjectResult projectResult)
        {
            throw new NotImplementedException();
        }
    }
}
