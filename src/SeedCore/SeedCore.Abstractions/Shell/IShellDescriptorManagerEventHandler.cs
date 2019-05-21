using System.Threading.Tasks;
using SeedCore.Shell.Descriptor.Models;

namespace SeedCore.Shell
{
    public interface IShellDescriptorManagerEventHandler
    {
        Task Changed(ShellDescriptor descriptor, string tenant);
    }
}
