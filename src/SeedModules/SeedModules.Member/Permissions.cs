using SeedCore.MemberShip.Security.Permissions;
using System.Collections.Generic;

namespace SeedModules.Member
{
    public class Permissions : IPermissionProvider
    {
        public static readonly Permission ManageUsers = new Permission("ManageUsers", "Managing Users");

        public IEnumerable<Permission> GetPermissions()
        {
            return new[] {
                ManageUsers,
            };
        }

        public IEnumerable<PermissionStereotype> GetDefaultStereotypes()
        {
            return new[] {
                new PermissionStereotype {
                    Name = "Administrator",
                    Permissions = new[] {ManageUsers}
                },
            };
        }

    }
}
