using Seed.Security.Permissions;
using System;
using System.Collections.Generic;
using System.Text;

namespace SeedModules.Admin
{
    public class PermissionsProvider : IPermissionProvider
    {
        public static readonly Permission ManageUsers = new Permission("ManageUsers", "用户管理");
        public static readonly Permission ManageRoles = new Permission("ManageRoles", "角色管理");
        public static readonly Permission AssignRoles = new Permission("AssignRoles", "分配角色", new[] { ManageRoles });

        public IEnumerable<Permission> GetPermissions()
        {
            return new[] {
                ManageUsers,
                ManageRoles,
                AssignRoles
            };
        }

        public IEnumerable<PermissionStereotype> GetDefaultStereotypes()
        {
            return new[] {
                new PermissionStereotype {
                    Name = "Administrator",
                    Permissions = new[]
                    {
                        ManageUsers,
                        ManageRoles,
                        AssignRoles
                    }
                }
            };
        }
    }
}
