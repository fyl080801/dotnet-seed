using Microsoft.AspNetCore.Identity;
using Seed.Security;
using System.Threading.Tasks;

namespace SeedModules.Admin.Users
{
    public class UserRoleRemovedEventHandler : IRoleRemovedEventHandler
    {
        readonly UserManager<IUser> _userManager;

        public UserRoleRemovedEventHandler(UserManager<IUser> userManager)
        {
            _userManager = userManager;
        }

        public async Task RoleRemovedAsync(string roleName)
        {
            var users = await _userManager.GetUsersInRoleAsync(roleName);

            foreach (var user in users)
            {
                await _userManager.RemoveFromRoleAsync(user, roleName);
            }
        }
    }
}