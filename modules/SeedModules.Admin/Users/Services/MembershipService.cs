using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using System.Threading.Tasks;

namespace SeedModules.Admin.Users.Services
{
    public class MembershipService : IMembershipService
    {
        readonly UserManager<IUser> _userManager;
        readonly IUserClaimsPrincipalFactory<IUser> _claimsPrincipalFactory;

        public MembershipService(
            UserManager<IUser> userManager,
            IUserClaimsPrincipalFactory<IUser> claimsPrincipalFactory)
        {
            _userManager = userManager;
            _claimsPrincipalFactory = claimsPrincipalFactory;
        }

        public async Task<bool> CheckPasswordAsync(string username, string password)
        {
            var user = await _userManager.FindByNameAsync(username);

            return user == null
                ? false
                : await _userManager.CheckPasswordAsync(user, password);
        }

        public async Task<ClaimsPrincipal> CreateClaimsPrincipal(IUser user)
        {
            return await _claimsPrincipalFactory.CreateAsync(user);
        }

        public async Task<IUser> GetUserAsync(string username)
        {
            return await _userManager.FindByNameAsync(username);
        }
    }
}
