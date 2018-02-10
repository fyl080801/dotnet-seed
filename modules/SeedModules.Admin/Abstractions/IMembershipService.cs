using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace SeedModules.Admin.Abstractions
{
    public interface IMembershipService
    {
        Task<IUser> GetUserAsync(string username);

        Task<bool> CheckPasswordAsync(string username, string password);

        Task<ClaimsPrincipal> CreateClaimsPrincipal(IUser user);
    }
}
