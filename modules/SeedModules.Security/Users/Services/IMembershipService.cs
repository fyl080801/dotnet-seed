using Seed.Security;
using System.Security.Claims;
using System.Threading.Tasks;

namespace SeedModules.Security.Users.Services
{
    public interface IMembershipService
    {
        Task<IUser> GetUserAsync(string username);

        Task<bool> CheckPasswordAsync(string username, string password);

        Task<ClaimsPrincipal> CreateClaimsPrincipal(IUser user);
    }
}
