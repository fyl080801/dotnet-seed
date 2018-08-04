using Seed.Project.Domain;
using System.Threading.Tasks;

namespace Seed.Project
{
    public interface IProjectStore
    {
        Task<ProjectResult> CreateAsync(ProjectResult projectResult);

        Task DeleteAsync(ProjectResult projectResult);

        Task<ProjectResult> FindByExecutionIdAsync(string executionId);

        Task UpdateAsync(ProjectResult projectResult);
    }
}
