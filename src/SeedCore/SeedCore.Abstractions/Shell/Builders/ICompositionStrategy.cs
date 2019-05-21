using System.Threading.Tasks;
using SeedCore.Shell.Builders.Models;
using SeedCore.Shell.Descriptor.Models;

namespace SeedCore.Shell.Builders
{
    public interface ICompositionStrategy
    {
        Task<ShellBlueprint> ComposeAsync(ShellSettings settings, ShellDescriptor descriptor);
    }
}