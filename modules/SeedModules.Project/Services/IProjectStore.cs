using SeedModules.Project.Domain;
using System.Threading.Tasks;

namespace SeedModules.Project.Services
{
    public interface IProjectStore
    {
        Task<ProjectResult> CreateAsync(ProjectResult projectResult);

        Task DeleteAsync(ProjectResult projectResult);

        Task<ProjectResult> FindByExecutionIdAsync(string executionId);

        Task UpdateAsync(ProjectResult projectResult);
    }
}
