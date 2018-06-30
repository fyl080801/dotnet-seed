using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;

namespace SeedModules.MindPlus.Extensions
{
    public static class ServiceCollectionExtensions
    {
        const string LoginPath = "/SeedModules.MindPlus/Home/Login";

        public static IServiceCollection AddMindAuthenticationServices(this IServiceCollection services,
            IDataProtectionProvider dataProtectionProvider,
            string tenantName,
            string prefix)
        {
            services
            .ConfigureApplicationCookie(options =>
            {
                options.LoginPath = LoginPath;
            });
            // .AddCookie("mindplus", "mindplus", options =>
            // {
            //     options.Cookie.Name = "seed_" + tenantName;
            //     options.Cookie.Path = prefix;
            //     options.LoginPath = new PathString(LoginPath);
            //     options.AccessDeniedPath = new PathString(LoginPath);
            //     options.DataProtectionProvider = dataProtectionProvider;
            // });

            return services;
        }
    }
}