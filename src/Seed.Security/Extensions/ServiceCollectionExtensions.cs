using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.DependencyInjection;
using Seed.Security.AuthorizationHandlers;

namespace Seed.Security.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddSecurity(this IServiceCollection services)
        {
            services.AddAuthorization();
            services.AddScoped<IAuthorizationHandler, SuperUserHandler>();
            services.AddScoped<IAuthorizationHandler, PermissionHandler>();

            return services;
        }
    }
}
