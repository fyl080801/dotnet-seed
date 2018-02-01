using Seed.Project.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Seed.Project
{
    public interface IProjectStore
    {
        Task CreateAsync(ProjectResult projectResult);

        Task DeleteAsync(ProjectResult projectResult);

        Task<ProjectResult> FindByExecutionIdAsync(string executionId);

        Task UpdateAsync(ProjectResult projectResult);
    }
}
