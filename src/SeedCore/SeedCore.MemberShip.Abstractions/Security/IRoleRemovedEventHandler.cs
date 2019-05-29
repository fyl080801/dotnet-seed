using System.Threading.Tasks;

namespace SeedCore.MemberShip.Security
{
    public interface IRoleRemovedEventHandler
    {
        Task RoleRemovedAsync(string roleName);
    }
}