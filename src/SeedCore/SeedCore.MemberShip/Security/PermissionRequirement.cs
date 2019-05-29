using Microsoft.AspNetCore.Authorization;
using SeedCore.MemberShip.Security.Permissions;
using System;

namespace SeedCore.MemberShip.Security
{
    public class PermissionRequirement : IAuthorizationRequirement
    {
        public PermissionRequirement(Permission permission)
        {
            if (permission == null)
            {
                throw new ArgumentNullException(nameof(permission));
            }

            Permission = permission;
        }

        public Permission Permission { get; set; }
    }
}


