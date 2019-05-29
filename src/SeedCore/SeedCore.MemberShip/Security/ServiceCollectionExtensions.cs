using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.DependencyInjection;
using SeedCore.MemberShip.Security.AuthorizationHandlers;
using System.Linq;

namespace SeedCore.MemberShip.Security
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddSecurity(this IServiceCollection services)
        {
            services.AddAuthorization();
            services.AddAuthentication((options) =>
            {
                if (!options.Schemes.Any(x => x.Name == "Api"))
                {
                    options.AddScheme<ApiAuthenticationHandler>("Api", null);
                }
            });

            services.AddScoped<IAuthorizationHandler, SuperUserHandler>();
            services.AddScoped<IAuthorizationHandler, PermissionHandler>();

            return services;
        }
    }
}