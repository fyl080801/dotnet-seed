using Seed.Project.Models;
using System.Threading.Tasks;

namespace Seed.Project
{
    public interface IProjectStepHandler
    {
        Task ExecuteAsync(ProjectExecutionContext context);
    }
}
