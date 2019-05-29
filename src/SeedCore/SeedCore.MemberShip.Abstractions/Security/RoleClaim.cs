using System.Security.Claims;

namespace SeedCore.MemberShip.Security
{
    public class RoleClaim
    {
        public string ClaimType { get; set; }

        public string ClaimValue { get; set; }

        public Claim ToClaim()
        {
            return new Claim(ClaimType, ClaimValue);
        }
    }
}
