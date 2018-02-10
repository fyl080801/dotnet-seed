using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Seed.Modules.Account.Permissions;
using Seed.Modules.Setup.Events;
using SeedModules.Admin.Abstractions;
using SeedModules.Admin.Services;
using System;

namespace SeedModules.Admin.Extensions
{
    public static class AuthenticationServiceCollectionExtensions
    {
        const string LoginPath = "Login";

        public static IServiceCollection AddAuthenticationServices(this IServiceCollection services, IDataProtectionProvider dataProtectionProvider, string tenantName, string prefix)
        {
            services.AddSecurity();

            new IdentityBuilder(typeof(IUser), typeof(IRole), services).AddDefaultTokenProviders();

            // 需要在 tenant 的服务中注册
            services.AddSingleton<IAuthenticationSchemeProvider, AuthenticationSchemeProvider>();

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = IdentityConstants.ApplicationScheme;
                options.DefaultChallengeScheme = IdentityConstants.ApplicationScheme;
                options.DefaultSignInScheme = IdentityConstants.ExternalScheme;
            })
            .AddCookie(IdentityConstants.ApplicationScheme, o =>
            {
                o.LoginPath = new PathString("/Account/Login");
                o.Events = new CookieAuthenticationEvents
                {
                    OnValidatePrincipal = async context =>
                    {
                        await SecurityStampValidator.ValidatePrincipalAsync(context);
                    }
                };
            })
            .AddCookie(IdentityConstants.ExternalScheme, o =>
            {
                o.Cookie.Name = IdentityConstants.ExternalScheme;
                o.ExpireTimeSpan = TimeSpan.FromMinutes(5);
            })
            .AddCookie(IdentityConstants.TwoFactorRememberMeScheme, o =>
            {
                o.Cookie.Name = IdentityConstants.TwoFactorRememberMeScheme;
            })
            .AddCookie(IdentityConstants.TwoFactorUserIdScheme, IdentityConstants.TwoFactorUserIdScheme, o =>
            {
                o.Cookie.Name = IdentityConstants.TwoFactorUserIdScheme;
                o.ExpireTimeSpan = TimeSpan.FromMinutes(5);
            });

            services.TryAddScoped<IUserValidator<IUser>, UserValidator<IUser>>();
            services.TryAddScoped<IPasswordValidator<IUser>, PasswordValidator<IUser>>();
            services.TryAddScoped<IPasswordHasher<IUser>, PasswordHasher<IUser>>();
            services.TryAddSingleton<ILookupNormalizer, UpperInvariantLookupNormalizer>();

            services.TryAddScoped<IdentityErrorDescriber>();
            services.TryAddScoped<ISecurityStampValidator, SecurityStampValidator<IUser>>();
            services.TryAddScoped<IUserClaimsPrincipalFactory<IUser>, UserClaimsPrincipalFactory<IUser, IRole>>();
            services.TryAddScoped<UserManager<IUser>>();
            services.TryAddScoped<SignInManager<IUser>>();

            services.TryAddScoped<IUserStore<IUser>, UserStore>();

            services.ConfigureApplicationCookie(o =>
            {
                o.Cookie.Name = "seed_" + tenantName;
                o.Cookie.Path = new PathString(prefix);
                o.LoginPath = new PathString("/" + LoginPath);
                o.AccessDeniedPath = new PathString("/" + LoginPath);
                o.DataProtectionProvider = dataProtectionProvider;
            })
            .ConfigureExternalCookie(o =>
            {
                o.DataProtectionProvider = dataProtectionProvider;
            })
            .Configure<CookieAuthenticationOptions>(IdentityConstants.TwoFactorRememberMeScheme, o =>
            {
                o.DataProtectionProvider = dataProtectionProvider;
            })
            .Configure<CookieAuthenticationOptions>(IdentityConstants.TwoFactorUserIdScheme, o =>
            {
                o.DataProtectionProvider = dataProtectionProvider;
            });

            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IMembershipService, MembershipService>();
            services.AddScoped<ISetupEventHandler, SetupEventHandler>();
            services.AddScoped<IRoleRemovedEventHandler, UserRoleRemovedEventHandler>();

            services.AddScoped<IPermissionProvider, ManagePermissions>();

            return services;
        }

        public static IServiceCollection AddSecurity(this IServiceCollection services)
        {
            services.AddAuthorization();
            services.AddScoped<IAuthorizationHandler, SuperUserHandler>();
            services.AddScoped<IAuthorizationHandler, PermissionHandler>();

            return services;
        }
    }
}
