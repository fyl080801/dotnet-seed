using SeedCore.MemberShip.Security.Permissions;
using System;
using System.Collections.Generic;
using System.Text;

namespace SeedModules.Features
{
    public class Permissions : IPermissionProvider
    {
        public static readonly Permission ManageFeatures = new Permission("ManageFeatures") { Description = "Manage Features" };

        public IEnumerable<Permission> GetPermissions()
        {
            return new[]
            {
                ManageFeatures
            };
        }

        public IEnumerable<PermissionStereotype> GetDefaultStereotypes()
        {
            return new[]
            {
                new PermissionStereotype
                {
                    Name = "Administrator",
                    Permissions = new[] { ManageFeatures }
                }
            };
        }
    }
}
