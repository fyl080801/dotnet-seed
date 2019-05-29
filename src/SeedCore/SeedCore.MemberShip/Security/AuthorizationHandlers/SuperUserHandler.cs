using Microsoft.AspNetCore.Authorization;
using SeedCore.Infrastructure.Settings;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace SeedCore.MemberShip.Security.AuthorizationHandlers
{
    public class SuperUserHandler : IAuthorizationHandler
    {
        private readonly ISiteService _siteService;

        public SuperUserHandler(ISiteService siteService)
        {
            _siteService = siteService;
        }

        public async Task HandleAsync(AuthorizationHandlerContext context)
        {
            if (context?.User?.Identity?.Name == null)
            {
                return;
            }

            var superUser = (await _siteService.GetSiteSettingsAsync()).SuperUser;

            if (string.Equals(context.User.Identity.Name, superUser, StringComparison.OrdinalIgnoreCase))
            {
                foreach (var requirement in context.Requirements.OfType<PermissionRequirement>())
                {
                    context.Succeed(requirement);
                }
            }
        }
    }
}
