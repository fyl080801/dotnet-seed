using SeedModules.Project.Models;
using System.Threading.Tasks;

namespace SeedModules.Project.Services
{
    public interface IProjectStepHandler
    {
        Task ExecuteAsync(ProjectExecutionContext context);
    }
}
