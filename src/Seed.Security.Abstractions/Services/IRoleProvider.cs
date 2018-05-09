using System.Collections.Generic;
using System.Threading.Tasks;

namespace Seed.Security.Services
{
    public interface IRoleProvider
    {
        Task<IEnumerable<string>> GetRoleNamesAsync();

        Task<IEnumerable<IRole>> GetRolesAsync();
    }
}