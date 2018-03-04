using Seed.Security.Permissions;
using System.Collections.Generic;

namespace SeedModules.Settings
{
    public class Permissions : IPermissionProvider
    {
        public static readonly PermissionInfo ManageSettings = new PermissionInfo("ManageSettings", "系统设置");

        public static readonly PermissionInfo ManageGroupSettings = new PermissionInfo("ManageResourceSettings", "系统设置", new[] { ManageSettings });

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

        public IEnumerable<PermissionInfo> GetPermissions()
        {
            return new[]
            {
                ManageSettings
            };
        }
    }
}
