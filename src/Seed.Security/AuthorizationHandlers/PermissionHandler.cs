﻿using Microsoft.AspNetCore.Authorization;
using Seed.Security.Permissions;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Seed.Security.AuthorizationHandlers
{
    public class PermissionHandler : AuthorizationHandler<PermissionRequirement>
    {
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, PermissionRequirement requirement)
        {
            if (!(bool)context?.User?.Identity?.IsAuthenticated)
            {
                return Task.CompletedTask;
            }
            else if (context.User.HasClaim(Permission.ClaimType, requirement.Permission.Name))
            {
                context.Succeed(requirement);
            }
            return Task.CompletedTask;
        }
    }
}
