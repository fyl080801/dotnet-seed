using SeedModules.Project.Models;
using System.Threading.Tasks;

namespace SeedModules.Project.Services
{
    public interface IProjectExecutor
    {
        Task<string> ExecuteAsync(string executionId, ProjectDescriptor projectDescriptor, object environment);
    }
}
