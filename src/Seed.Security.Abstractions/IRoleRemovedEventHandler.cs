using System.Threading.Tasks;

namespace Seed.Security
{
    public interface IRoleRemovedEventHandler
    {
        Task RoleRemovedAsync(string rolename);
    }
}
