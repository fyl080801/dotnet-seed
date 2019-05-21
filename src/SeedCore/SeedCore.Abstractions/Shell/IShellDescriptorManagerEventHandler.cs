using SeedCore.Shell.Descriptor.Models;
using System.Threading.Tasks;

namespace SeedCore.Shell
{
    public interface IShellDescriptorManagerEventHandler
    {
        Task Changed(ShellDescriptor descriptor, string tenant);
    }
}
