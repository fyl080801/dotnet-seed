using Microsoft.AspNetCore.Identity;
using Seed.Environment.Plugins;
using Seed.Security;
using Seed.Security.Permissions;
using SeedModules.Project.Models;
using SeedModules.Project.Services;
using SeedModules.Security.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SeedModules.Admin.Projects
{
    public class RolesStep : IProjectStepHandler
    {
        readonly RoleManager<IRole> _roleManager;
        readonly ITypeFeatureProvider _typeFeatureProvider;
        readonly IEnumerable<IPermissionProvider> _permissionProviders;

        public RolesStep(
            RoleManager<IRole> roleManager,
            ITypeFeatureProvider typeFeatureProvider,
            IEnumerable<IPermissionProvider> permissionProviders)
        {
            _roleManager = roleManager;
            _typeFeatureProvider = typeFeatureProvider;
            _permissionProviders = permissionProviders;
        }

        public async Task ExecuteAsync(ProjectExecutionContext context)
        {
            if (!String.Equals(context.Name, "Roles", StringComparison.OrdinalIgnoreCase))
            {
                return;
            }

            var model = context.Step.ToObject<RolesStepModel>();

            foreach (var roleModel in model.Roles)
            {
                if (string.IsNullOrWhiteSpace(roleModel.Name))
                    continue;

                var role = (Role)await _roleManager.FindByNameAsync(roleModel.Name);
                bool isNewRole = role == null;

                if (isNewRole)
                {
                    role = new Role { Rolename = roleModel.Name };
                }
                role.RoleClaims.RemoveAll(e => e.ClaimType == PermissionInfo.ClaimType);
                role.RoleClaims.AddRange(roleModel.Permissions.Select(e => new RoleClaim { ClaimType = PermissionInfo.ClaimType, ClaimValue = e }));

                if (isNewRole)
                {
                    await _roleManager.CreateAsync(role);
                }
                else
                {
                    await _roleManager.UpdateAsync(role);
                }
            }
        }
    }

    public class RolesStepModel
    {
        public IEnumerable<RoleModel> Roles { get; set; }
    }

    public class RoleModel
    {
        public string Name { get; set; }
        public IEnumerable<string> Permissions { get; set; }
    }
}
