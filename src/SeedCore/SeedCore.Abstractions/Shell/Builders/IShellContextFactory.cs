using System.Threading.Tasks;
using SeedCore.Shell.Descriptor.Models;

namespace SeedCore.Shell.Builders
{
    public interface IShellContextFactory
    {
        Task<ShellContext> CreateShellContextAsync(ShellSettings settings);

        Task<ShellContext> CreateSetupContextAsync(ShellSettings settings);

        Task<ShellContext> CreateDescribedContextAsync(ShellSettings settings, ShellDescriptor shellDescriptor);
    }
}