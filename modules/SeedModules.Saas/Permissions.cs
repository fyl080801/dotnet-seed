using System;
using System.Collections.Generic;
using Seed.Security.Permissions;

namespace SeedModules.Saas
{
    public class Permissions : IPermissionProvider
    {
        public const string Saas_ManageDatasource = "Saas_ManageDatasource";

        public const string Saas_ManageTemplate = "Saas_ManageTemplate";

        public const string Saas_ManageTenant = "Saas_ManageTenant";

        public const string Saas_SaveTenant = "Saas_SaveTenant";

        public IEnumerable<PermissionStereotype> GetDefaultStereotypes()
        {
            return new[] {
                new PermissionStereotype()
                {
                    Name = "Administrator",
                    Permissions = GetPermissions()
                }
            };
        }

        public IEnumerable<PermissionInfo> GetPermissions()
        {
            return new[]
            {
                new PermissionInfo(Saas_ManageDatasource, "管理数据源"),
                new PermissionInfo(Saas_ManageTemplate, "管理模板"),
                new PermissionInfo(Saas_ManageTenant, "管理租户"),
                new PermissionInfo(Saas_SaveTenant, "编辑租户")
            };
        }
    }
}