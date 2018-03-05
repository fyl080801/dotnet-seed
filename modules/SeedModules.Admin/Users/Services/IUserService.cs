using Seed.Security;
using System;
using System.Security.Claims;
using System.Threading.Tasks;

namespace SeedModules.Admin.Users.Services
{
    public interface IUserService
    {
        Task<IUser> CreateUserAsync(string username, string email, string[] roleNames, string password, Action<string, string> reportError);

        Task<bool> ChangePasswordAsync(IUser user, string currentPassword, string newPassword, Action<string, string> reportError);

        Task<IUser> GetAuthenticatedUserAsync(ClaimsPrincipal principal);
    }
}
