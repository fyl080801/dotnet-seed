using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using SeedCore.MemberShip.Security;
using System.Security.Claims;
using System.Threading.Tasks;

namespace SeedCore.MemberShip.Services
{
    public class DefaultUserClaimsPrincipalFactory : UserClaimsPrincipalFactory<IUser, IRole>
    {
        private readonly UserManager<IUser> _userManager;
        private readonly IOptions<IdentityOptions> _identityOptions;

        public DefaultUserClaimsPrincipalFactory(
            UserManager<IUser> userManager,
            RoleManager<IRole> roleManager,
            IOptions<IdentityOptions> identityOptions) : base(userManager, roleManager, identityOptions)
        {
            _userManager = userManager;
            _identityOptions = identityOptions;
        }

        protected override async Task<ClaimsIdentity> GenerateClaimsAsync(IUser user)
        {
            var claims = await base.GenerateClaimsAsync(user);

            var email = await _userManager.GetEmailAsync(user);

            if (email != null)
            {
                claims.AddClaim(new Claim("email", email));
            }

            if (await _userManager.IsEmailConfirmedAsync(user))
            {
                claims.AddClaim(new Claim("email_verified", "true"));
            }

            return claims;
        }
    }
}
