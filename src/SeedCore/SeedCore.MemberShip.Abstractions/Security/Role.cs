using System.Collections.Generic;

namespace SeedCore.MemberShip.Security
{
    public class Role: IRole
    {
        public string RoleName { get; set; }
        public string NormalizedRoleName { get; set; }
        public List<RoleClaim> RoleClaims { get; } = new List<RoleClaim>();
    }
}
