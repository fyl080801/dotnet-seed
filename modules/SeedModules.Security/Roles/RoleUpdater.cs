using Microsoft.AspNetCore.Identity;
using Seed.Environment.Engine;
using Seed.Plugins;
using Seed.Plugins.Features;
using Seed.Security;
using Seed.Security.Permissions;
using SeedModules.Security.Domain;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace SeedModules.Security.Roles
{
    /// <summary>
    /// 功能发生事件时角色的相关处理
    /// </summary>
    /// <remarks>
    /// 用于功能启用时添加功能相关的角色
    /// </remarks>
    public class RoleUpdater : IFeatureEventHandler
    {
        readonly RoleManager<IRole> _roleManager;
        readonly IEnumerable<IPermissionProvider> _permissionProviders;
        readonly ITypeFeatureProvider _typeFeatureProvider;

        public RoleUpdater(
            RoleManager<IRole> roleManager,
            IEnumerable<IPermissionProvider> permissionProviders,
            ITypeFeatureProvider typeFeatureProvider)
        {
            _roleManager = roleManager;
            _permissionProviders = permissionProviders;
            _typeFeatureProvider = typeFeatureProvider;
        }

        public void Disabled(IFeatureInfo feature)
        {

        }

        public void Disabling(IFeatureInfo feature)
        {

        }

        public void Enabled(IFeatureInfo feature)
        {

        }

        public void Enabling(IFeatureInfo feature)
        {

        }

        public void Installed(IFeatureInfo feature)
        {
            AddDefaultRolesForFeatureAsync(feature).Wait();
        }

        public void Installing(IFeatureInfo feature)
        {

        }

        public void Uninstalled(IFeatureInfo feature)
        {

        }

        public void Uninstalling(IFeatureInfo feature)
        {

        }

        public async Task AddDefaultRolesForFeatureAsync(IFeatureInfo feature)
        {
            var providersForEnabledModule = _permissionProviders
                .Where(x => _typeFeatureProvider.GetFeatureForDependency(x.GetType()).Id == feature.Id);

            foreach (var permissionProvider in providersForEnabledModule)
            {
                var stereotypes = permissionProvider.GetDefaultStereotypes();
                foreach (var stereotype in stereotypes)
                {
                    var role = await _roleManager.FindByNameAsync(stereotype.Name);
                    if (role == null)
                    {
                        role = new Role { Rolename = stereotype.Name };
                        await _roleManager.CreateAsync(role);
                    }

                    var stereotypePermissionNames = (stereotype.Permissions ?? Enumerable.Empty<PermissionInfo>()).Select(x => x.Name);
                    var currentPermissionNames = ((Role)role).RoleClaims.Where(x => x.ClaimType == PermissionInfo.ClaimType).Select(x => x.ClaimValue);

                    var distinctPermissionNames = currentPermissionNames
                        .Union(stereotypePermissionNames)
                        .Distinct();

                    var additionalPermissionNames = distinctPermissionNames.Except(currentPermissionNames);

                    if (additionalPermissionNames.Any())
                    {
                        foreach (var permissionName in additionalPermissionNames)
                        {
                            await _roleManager.AddClaimAsync(role, new Claim(PermissionInfo.ClaimType, permissionName));
                        }
                    }
                }
            }
        }
    }
}
