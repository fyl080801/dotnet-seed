using Microsoft.AspNetCore.Authorization;
using Seed.Security.Permissions;
using System;

namespace Seed.Security
{
    public class PermissionRequirement : IAuthorizationRequirement
    {
        public PermissionRequirement(Permission permission)
        {
            Permission = permission ?? throw new ArgumentNullException(nameof(permission));
        }

        public Permission Permission { get; set; }
    }
}