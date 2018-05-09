using Microsoft.AspNetCore.Authorization;
using Seed.Modules.Site;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Seed.Security.AuthorizationHandlers
{
    public class SuperUserHandler : IAuthorizationHandler
    {
        readonly ISiteService _siteService;

        public SuperUserHandler(ISiteService siteService)
        {
            _siteService = siteService;
        }

        public async Task HandleAsync(AuthorizationHandlerContext context)
        {
            if (context?.User?.Identity?.Name == null) return;

            var superuser = (await _siteService.GetSiteInfoAsync()).SuperUser;

            if (context.User.Identity.Name.Equals(superuser, StringComparison.OrdinalIgnoreCase))
            {
                foreach (var requirement in context.PendingRequirements.OfType<PermissionRequirement>())
                {
                    context.Succeed(requirement);
                }
            }
        }
    }
}
