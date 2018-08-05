using Microsoft.AspNetCore.Authorization;
using Seed.Mvc.Settings;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Seed.Security.AuthorizationHandlers
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

            var superUser = (await _siteService.GetSiteInfoAsync()).SuperUser;

            if (String.Equals(context.User.Identity.Name, superUser, StringComparison.OrdinalIgnoreCase))
            {
                foreach (var requirement in context.Requirements.OfType<PermissionRequirement>())
                {
                    context.Succeed(requirement);
                }
            }
        }
    }
}
