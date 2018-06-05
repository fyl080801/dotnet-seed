using Seed.Security.Permissions;
using System;
using System.Collections.Generic;
using System.Text;

namespace SeedModules.SqlBuilder
{
    public class Permissions : IPermissionProvider
    {
        public static readonly PermissionInfo SqlBuilderSettings = new PermissionInfo("SqlBuilderSettings", "查询管理");

        public IEnumerable<PermissionStereotype> GetDefaultStereotypes()
        {
            return new[] {
                new PermissionStereotype {
                    Name = "Administrator",
                    Permissions = GetPermissions()
                }
            };
        }

        public IEnumerable<PermissionInfo> GetPermissions()
        {
            return new[] {
                SqlBuilderSettings
            };
        }
    }
}
