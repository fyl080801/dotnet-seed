using Seed.Modules.Account.Permissions;
using System;
using System.Collections.Generic;
using System.Text;

namespace SeedModules.Admin.Services
{
    public class ManagePermissions : IPermissionProvider
    {
        public static readonly Permission Users = new Permission("Users", "Users");

        public IEnumerable<Permission> GetPermissions()
        {
            return new[] {
                Users
            };
        }

        public IEnumerable<PermissionStereotype> GetDefaultStereotypes()
        {
            return new[] {
                new PermissionStereotype {
                    Name = "Administrator",
                    Permissions = new[] { Users }
                }
            };
        }
    }
}
