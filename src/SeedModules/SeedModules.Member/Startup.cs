using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using SeedCore.MemberShip;
using SeedCore.MemberShip.Security;
using SeedCore.MemberShip.Services;
using SeedCore.Modules;
using SeedCore.Shell;
using System;

namespace SeedModules.Member
{
    public class Startup : StartupBase
    {
        private const string LoginPath = "Login";
        private const string ChangePasswordPath = "ChangePassword";

        private readonly string _tenantName;

        public Startup(ShellSettings shellSettings)
        {
            _tenantName = shellSettings.Name;
        }

        public override void ConfigureServices(IServiceCollection services)
        {
            services.AddSecurity();

            services.TryAddSingleton<ILookupNormalizer, UpperInvariantLookupNormalizer>();

            services.AddIdentity<IUser, IRole>().AddDefaultTokenProviders();

            services.AddAuthentication(options => options.DefaultSignOutScheme = IdentityConstants.ApplicationScheme);

            services.TryAddScoped<UserStore>();
            services.TryAddScoped<IUserStore<IUser>>(sp => sp.GetRequiredService<UserStore>());
            services.TryAddScoped<IUserRoleStore<IUser>>(sp => sp.GetRequiredService<UserStore>());
            services.TryAddScoped<IUserPasswordStore<IUser>>(sp => sp.GetRequiredService<UserStore>());
            services.TryAddScoped<IUserEmailStore<IUser>>(sp => sp.GetRequiredService<UserStore>());
            services.TryAddScoped<IUserSecurityStampStore<IUser>>(sp => sp.GetRequiredService<UserStore>());
            services.TryAddScoped<IUserLoginStore<IUser>>(sp => sp.GetRequiredService<UserStore>());

            services.ConfigureApplicationCookie(options =>
            {
                options.Cookie.Name = "seedauth_" + _tenantName;

                options.LoginPath = "/" + LoginPath;
                options.AccessDeniedPath = options.LoginPath;

                options.Cookie.SameSite = SameSiteMode.None;
            });

        }

        public override void Configure(IApplicationBuilder app, IRouteBuilder routes, IServiceProvider serviceProvider)
        {
            routes.MapAreaRoute(
               name: "Login",
               areaName: "SeedModules.Users",
               template: LoginPath,
               defaults: new { controller = "Account", action = "Login" });

            routes.MapAreaRoute(
                name: "ChangePassword",
                areaName: "SeedModules.Users",
                template: ChangePasswordPath,
                defaults: new { controller = "Account", action = "ChangePassword" });
        }
    }
}
