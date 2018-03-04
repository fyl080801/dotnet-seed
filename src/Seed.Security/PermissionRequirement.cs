using Microsoft.AspNetCore.Authorization;
using Seed.Security.Permissions;
using System;

namespace Seed.Security
{
    public class PermissionRequirement : IAuthorizationRequirement
    {
        public PermissionRequirement(PermissionInfo permission)
        {
            Permission = permission ?? throw new ArgumentNullException(nameof(permission));
        }

        public PermissionInfo Permission { get; set; }
    }
}