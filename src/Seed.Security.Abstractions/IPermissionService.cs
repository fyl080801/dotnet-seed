using System.Threading.Tasks;
using Seed.Security.Permissions;

namespace Seed.Security
{
    public interface IPermissionService
    {
        Task<PermissionInfo> GetPermissionAsync(string name);

        Task<bool> CheckPermissionAsync(PermissionInfo permission);
    }
}