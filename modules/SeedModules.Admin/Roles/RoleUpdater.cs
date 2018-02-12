using Seed.Plugins.Feature;
using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Seed.Security;
using Seed.Security.Permissions;
using System.Threading.Tasks;
using System.Linq;
using SeedModules.Admin.Domain;
using System.Security.Claims;

namespace SeedModules.Admin.Roles
{
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

                    var stereotypePermissionNames = (stereotype.Permissions ?? Enumerable.Empty<Permission>()).Select(x => x.Name);
                    var currentPermissionNames = ((Role)role).RoleClaims.Where(x => x.ClaimType == Permission.ClaimType).Select(x => x.ClaimValue);

                    var distinctPermissionNames = currentPermissionNames
                        .Union(stereotypePermissionNames)
                        .Distinct();

                    var additionalPermissionNames = distinctPermissionNames.Except(currentPermissionNames);

                    if (additionalPermissionNames.Any())
                    {
                        foreach (var permissionName in additionalPermissionNames)
                        {
                            await _roleManager.AddClaimAsync(role, new Claim(Permission.ClaimType, permissionName));
                        }
                    }
                }
            }
        }
    }
}
