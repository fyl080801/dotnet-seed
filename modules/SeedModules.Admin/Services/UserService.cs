using SeedModules.Admin.Abstractions;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace SeedModules.Admin.Services
{
    public class UserService : IUserService
    {
        public Task<bool> ChangePasswordAsync(IUser user, string currentPassword, string newPassword, Action<string, string> reportError)
        {
            throw new NotImplementedException();
        }

        public Task<IUser> CreateUserAsync(string username, string email, string[] rolename, string password, Action<string, string> reportError)
        {
            throw new NotImplementedException();
        }

        public Task<IUser> GetAuthenticatedUserAsync(ClaimsPrincipal principal)
        {
            throw new NotImplementedException();
        }
    }
}
