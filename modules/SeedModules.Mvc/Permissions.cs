using System.Collections.Generic;
using Seed.Security.Permissions;

namespace SeedModules.Mvc
{
    public class Permissions : IPermissionProvider
    {
        public IEnumerable<PermissionStereotype> GetDefaultStereotypes()
        {
            return new[] {
                new PermissionStereotype {
                    Name = "Administrator",
                    Permissions = new PermissionInfo[]
                    {
                        // ManageSettings,
                        // ManageUsers,
                        // ManageRoles,
                        // AssignRoles
                    }
                }
            };
        }

        public IEnumerable<PermissionInfo> GetPermissions()
        {
            return new PermissionInfo[0];
        }
    }
}