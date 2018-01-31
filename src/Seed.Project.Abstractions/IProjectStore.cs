using Seed.Project.Abstractions.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Seed.Project.Abstractions
{
    public interface IProjectStore
    {
        Task CreateAsync(ProjectResult projectResult);

        Task DeleteAsync(ProjectResult projectResult);

        Task<ProjectResult> FindByExecutionIdAsync(string executionId);

        Task UpdateAsync(ProjectResult projectResult);
    }
}
