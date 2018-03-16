using Microsoft.AspNetCore.Authorization;
using Seed.Security.Permissions;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Seed.Security.Extensions
{
    public static class AuthorizationServiceExtensions
    {
        public static Task<bool> PermissionAuthorizeAsync(this IAuthorizationService service, ClaimsPrincipal user, PermissionInfo permission)
        {
            return PermissionAuthorizeAsync(service, user, permission, null);
        }

        public static async Task<bool> PermissionAuthorizeAsync(this IAuthorizationService service, ClaimsPrincipal user, PermissionInfo permission, object resource)
        {
            return (await service.AuthorizeAsync(user, resource, new PermissionRequirement(permission))).Succeeded;
        }
    }
}
