using Seed.Security.Permissions;
using System;
using System.Collections.Generic;
using System.Text;

namespace SeedModules.Admin
{
    public class Permissions : IPermissionProvider
    {
        public static readonly PermissionInfo ManageSettings = new PermissionInfo("ManageSettings", "系统设置");
        public static readonly PermissionInfo ManageGroupSettings = new PermissionInfo("ManageResourceSettings", "系统设置", new[] { ManageSettings });
        public static readonly PermissionInfo ManageUsers = new PermissionInfo("ManageUsers", "用户管理");
        public static readonly PermissionInfo ManageRoles = new PermissionInfo("ManageRoles", "角色管理");
        public static readonly PermissionInfo AssignRoles = new PermissionInfo("AssignRoles", "分配角色", new[] { ManageRoles });

        public IEnumerable<PermissionInfo> GetPermissions()
        {
            return new[] {
                ManageSettings,
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
                        ManageSettings,
                        ManageUsers,
                        ManageRoles,
                        AssignRoles
                    }
                }
            };
        }
    }
}
