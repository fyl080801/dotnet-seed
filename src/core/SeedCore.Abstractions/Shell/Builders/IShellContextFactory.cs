using SeedCore.Shell.Descriptor.Models;
using System.Threading.Tasks;

namespace SeedCore.Shell.Builders
{
    public interface IShellContextFactory
    {
        Task<ShellContext> CreateShellContextAsync(ShellSettings settings);

        Task<ShellContext> CreateSetupContextAsync(ShellSettings settings);

        Task<ShellContext> CreateDescribedContextAsync(ShellSettings settings, ShellDescriptor shellDescriptor);
    }
}