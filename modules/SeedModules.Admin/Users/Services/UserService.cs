using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using SeedModules.Admin.Domain;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace SeedModules.Admin.Users.Services
{
    public class UserService : IUserService
    {
        readonly UserManager<IUser> _userManager;
        readonly IOptions<IdentityOptions> _identityOptions;

        public UserService(
            UserManager<IUser> userManager,
            IOptions<IdentityOptions> identityOptions)
        {
            _userManager = userManager;
            _identityOptions = identityOptions;
        }

        public async Task<bool> ChangePasswordAsync(IUser user, string currentPassword, string newPassword, Action<string, string> reportError)
        {
            var identityResult = await _userManager.ChangePasswordAsync(user, currentPassword, newPassword);

            if (!identityResult.Succeeded)
            {
                throw new Exception("修改不成功");
            }

            return identityResult.Succeeded;
        }

        public async Task<IUser> CreateUserAsync(string username, string email, string[] rolename, string password, Action<string, string> reportError)
        {
            if (await _userManager.FindByEmailAsync(email) != null)
            {
                throw new Exception("Email 重复");
            }

            var user = new User
            {
                Username = username,
                Email = email,
                RoleNames = new List<string>(rolename)
            };

            var identityResult = await _userManager.CreateAsync(user, password);

            if (!identityResult.Succeeded)
            {
                throw new Exception("创建不成功");
            }

            return user;
        }

        public Task<IUser> GetAuthenticatedUserAsync(ClaimsPrincipal principal)
        {
            if (principal == null)
            {
                return Task.FromResult<IUser>(null);
            }

            return _userManager.GetUserAsync(principal);
        }
    }
}
