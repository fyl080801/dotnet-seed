using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Seed.Modules.Setup.Events;
using Seed.Plugins.Feature;
using Seed.Security;
using Seed.Security.Extensions;
using Seed.Security.Permissions;
using Seed.Security.Services;
using SeedModules.Admin.Projects;
using SeedModules.Admin.Users;
using SeedModules.Admin.Users.Services;
using SeedModules.Project.Extensions;
using SeedModules.Security.Roles;
using System;

namespace SeedModules.Admin.Extensions
{
    public static class ServiceCollectionExtensions
    {
        const string LoginPath = "/SeedModules.Admin/Home/Login";

        public static IServiceCollection AddRoleServices(this IServiceCollection services)
        {
            services.TryAddScoped<RoleManager<IRole>>();
            services.TryAddScoped<IRoleStore<IRole>, RoleStore>();
            services.TryAddScoped<IRoleProvider, RoleStore>();
            services.TryAddScoped<IRoleClaimStore<IRole>, RoleStore>();
            services.AddProjectExecutionStep<RolesStep>();

            services.AddScoped<IFeatureEventHandler, RoleUpdater>();
            services.AddScoped<IAuthorizationHandler, RolesPermissionsHandler>();

            return services;
        }

        public static IServiceCollection AddAuthenticationServices(
            this IServiceCollection services,
            IDataProtectionProvider dataProtectionProvider,
            string tenantName,
            string prefix)
        {
            services.AddSecurity();

            new IdentityBuilder(typeof(IUser), typeof(IRole), services).AddDefaultTokenProviders();

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = IdentityConstants.ApplicationScheme;
                options.DefaultChallengeScheme = IdentityConstants.ApplicationScheme;
            })
            .AddCookie(IdentityConstants.ApplicationScheme)
            .AddCookie(IdentityConstants.ExternalScheme)
            .AddCookie(IdentityConstants.TwoFactorRememberMeScheme)
            .AddCookie(IdentityConstants.TwoFactorUserIdScheme);

            // 需要在 tenant 的服务中注册
            services.AddSingleton<IAuthenticationSchemeProvider, AuthenticationSchemeProvider>();

            // services.AddAuthentication(options =>
            // {
            //     options.DefaultAuthenticateScheme = IdentityConstants.ApplicationScheme;
            //     options.DefaultChallengeScheme = IdentityConstants.ApplicationScheme;
            //     options.DefaultSignInScheme = IdentityConstants.ExternalScheme;
            // })
            // .AddCookie(IdentityConstants.ApplicationScheme, options =>
            // {
            //     options.LoginPath = new PathString(LoginPath);
            //     options.Events = new CookieAuthenticationEvents
            //     {
            //         OnValidatePrincipal = async context =>
            //         {
            //             await SecurityStampValidator.ValidatePrincipalAsync(context);
            //         }
            //     };
            // })
            // .AddCookie(IdentityConstants.ExternalScheme, options =>
            // {
            //     options.Cookie.Name = IdentityConstants.ExternalScheme;
            //     options.ExpireTimeSpan = TimeSpan.FromMinutes(5);
            // })
            // .AddCookie(IdentityConstants.TwoFactorRememberMeScheme, options =>
            // {
            //     options.Cookie.Name = IdentityConstants.TwoFactorRememberMeScheme;
            // })
            // .AddCookie(IdentityConstants.TwoFactorUserIdScheme, IdentityConstants.TwoFactorUserIdScheme, options =>
            // {
            //     options.Cookie.Name = IdentityConstants.TwoFactorUserIdScheme;
            //     options.ExpireTimeSpan = TimeSpan.FromMinutes(5);
            // });

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

            services.ConfigureApplicationCookie(options =>
            {
                options.Cookie.Name = "seed_" + tenantName;
                options.Cookie.Path = prefix;
                options.LoginPath = new PathString(LoginPath);
                options.AccessDeniedPath = new PathString(LoginPath);
                options.DataProtectionProvider = dataProtectionProvider;
            })
            .ConfigureExternalCookie(options =>
            {
                options.DataProtectionProvider = dataProtectionProvider;
            })
            .Configure<CookieAuthenticationOptions>(IdentityConstants.TwoFactorRememberMeScheme, options =>
            {
                options.DataProtectionProvider = dataProtectionProvider;
            })
            .Configure<CookieAuthenticationOptions>(IdentityConstants.TwoFactorUserIdScheme, options =>
            {
                options.DataProtectionProvider = dataProtectionProvider;
            })
            .Configure<IdentityOptions>(options =>
            {
                // 先实现一个无策略的，回头加针对每个租户分别设置的 ConfigurationSource
                options.Password.RequireDigit = false;
                options.Password.RequiredLength = 1;
                options.Password.RequiredUniqueChars = 0;
                options.Password.RequireLowercase = false;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = false;
            });

            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IMembershipService, MembershipService>();
            services.AddScoped<ISetupEventHandler, SetupEventHandler>();
            services.AddScoped<IRoleRemovedEventHandler, UserRoleRemovedEventHandler>();

            services.AddScoped<IPermissionProvider, Permissions>();

            return services;
        }
    }
}
