using Seed.Project.Models;
using System.Threading.Tasks;

namespace Seed.Project
{
    public interface IProjectExecutor
    {
        Task<string> ExecuteAsync(string executionId, ProjectDescriptor projectDescriptor, object environment);
    }
}
