using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Seed.Security;
using Seed.Security.Permissions;
using SeedModules.Security.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace SeedModules.Security.Roles
{
    /// <summary>
    /// 角色权限验证的处理程序
    /// </summary>
    public class RolesPermissionsHandler : AuthorizationHandler<PermissionRequirement>
    {
        readonly RoleManager<IRole> _roleManager;

        public RolesPermissionsHandler(RoleManager<IRole> roleManager)
        {
            _roleManager = roleManager;
        }

        protected override async Task HandleRequirementAsync(AuthorizationHandlerContext context, PermissionRequirement requirement)
        {
            if (context.HasSucceeded)
            {
                return;
            }

            var grantingNames = new HashSet<string>(StringComparer.OrdinalIgnoreCase);

            // 认证权限前先把权限以及关联的权限，默认的权限取出来
            PermissionNames(requirement.Permission, grantingNames);

            // 系统里的默认角色，包括Anonymous和Authenticated
            // 其中Authenticated针对登录后的用户
            var rolesToExamine = new List<string> { "Anonymous" };

            if (context.User.Identity.IsAuthenticated)
            {
                // 已登录用户加入一个 Authenticated
                rolesToExamine.Add("Authenticated");

                // 加入当前用户所属于的角色
                // 角色权限在系统里通过Claim体现,找当前用户会话的中类型是角色权限的Claim
                rolesToExamine.AddRange(context.User.Claims.Where(e => e.Type == ClaimTypes.Role).Select(e => e.Value).ToArray());
            }

            foreach (var roleName in rolesToExamine)
            {
                var role = await _roleManager.FindByNameAsync(roleName);
                if (role != null)
                {
                    // 获取角色的授权
                    var claims = await _roleManager.GetClaimsAsync(role);
                    foreach (var claim in claims)
                    {
                        if (!String.Equals(claim.Type, PermissionInfo.ClaimType, StringComparison.OrdinalIgnoreCase))
                        {
                            continue;
                        }

                        if (grantingNames.Contains(claim.Value))
                        {
                            context.Succeed(requirement);
                            return;
                        }
                    }
                }
            }
        }

        private static void PermissionNames(PermissionInfo permission, HashSet<string> stack)
        {
            stack.Add(permission.Name);

            if (permission.IncludeBy != null && permission.IncludeBy.Any())
            {
                foreach (var includeBy in permission.IncludeBy)
                {
                    if (stack.Contains(includeBy.Name))
                    {
                        continue;
                    }

                    PermissionNames(includeBy, stack);
                }
            }

            stack.Add(StandardPermissions.SiteOwner.Name);
        }
    }
}
