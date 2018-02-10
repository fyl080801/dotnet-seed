using SeedModules.Admin.Abstractions;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace SeedModules.Admin.Services
{
    public class MembershipService : IMembershipService
    {
        public Task<bool> CheckPasswordAsync(string username, string password)
        {
            throw new NotImplementedException();
        }

        public Task<ClaimsPrincipal> CreateClaimsPrincipal(IUser user)
        {
            throw new NotImplementedException();
        }

        public Task<IUser> GetUserAsync(string username)
        {
            throw new NotImplementedException();
        }
    }
}
