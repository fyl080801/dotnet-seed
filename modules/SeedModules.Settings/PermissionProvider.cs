using Seed.Security.Permissions;
using System.Collections.Generic;

namespace SeedModules.Settings
{
    public class PermissionProvider : IPermissionProvider
    {
        public static readonly Permission ManageSettings = new Permission("ManageSettings", "系统设置");

        public static readonly Permission ManageGroupSettings = new Permission("ManageResourceSettings", "系统设置", new[] { ManageSettings });

        public IEnumerable<PermissionStereotype> GetDefaultStereotypes()
        {
            return new[]
            {
                new PermissionStereotype()
                {
                    Name = "Administrator",
                    Permissions = new[] { ManageSettings }
                }
            };
        }

        public IEnumerable<Permission> GetPermissions()
        {
            return new[]
            {
                ManageSettings
            };
        }
    }
}
