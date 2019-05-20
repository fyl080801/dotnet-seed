using System.Threading.Tasks;

namespace SeedCore.Shell.Builders
{
    public interface ICompositionStrategy
    {
        Task<ShellBlueprint> ComposeAsync(ShellSettings settings, ShellDescriptor descriptor);
    }
}