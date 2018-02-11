using Seed.Security.Permissions;
using System;
using System.Collections.Generic;
using System.Text;

namespace SeedModules.Admin
{
    public class PermissionsProvider : IPermissionProvider
    {
        public static readonly Permission ManageUsers = new Permission("ManageUsers", "用户管理");

        public IEnumerable<Permission> GetPermissions()
        {
            return new[] {
                ManageUsers
            };
        }

        public IEnumerable<PermissionStereotype> GetDefaultStereotypes()
        {
            return new[] {
                new PermissionStereotype {
                    Name = "Administrator",
                    Permissions = new[] { ManageUsers }
                }
            };
        }
    }
}
