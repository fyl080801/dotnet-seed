using AspNet.Security.OAuth.Validation;
using AspNet.Security.OpenIdConnect.Server;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Options;
using OpenIddict.EntityFrameworkCore.Models;
using OpenIddict.Server;
using Seed.Data;
using Seed.Modules;
using SeedModules.OpenId.Projects;
using SeedModules.OpenId.Services;
using SeedModules.OpenId.Stores;
using SeedModules.Project.Extensions;

namespace SeedModules.OpenId
{
    public class Startup : StartupBase
    {
        public override void ConfigureServices(IServiceCollection services)
        {
            //services.AddProjectExecutionStep<OpenIdSettingsStep>();
            services.AddProjectExecutionStep<OpenIdApplicationStep>();

            services.AddScoped<IEntityTypeConfigurationProvider, EntityTypeConfigurations>();
            services.AddOpenIddict(builder =>
            {
                builder.AddCore(config =>
                {
                    config.SetDefaultApplicationEntity<OpenIddictApplication>();
                    config.SetDefaultAuthorizationEntity<OpenIddictAuthorization>();
                    config.SetDefaultScopeEntity<OpenIddictScope>();
                    config.SetDefaultTokenEntity<OpenIddictToken>();
                    config.AddApplicationStore<OpenIdApplicationStore>();
                    config.AddAuthorizationStore<OpenIdAuthorizationStore>();
                    config.AddScopeStore<OpenIdScopeStore>();
                    config.AddTokenStore<OpenIdTokenStore>();
                });
            });

            services.AddScoped<OpenIdConnectServerHandler>();
            services.AddScoped<OpenIdConnectServerProvider>();
            //services.TryAddScoped<OpenIddictHandler>();
            //services.TryAddScoped<OpenIddictProvider<OpenIddictApplication, OpenIddictAuthorization, OpenIddictScope, OpenIddictToken>>();

            services.TryAddEnumerable(new[]
            {
                ServiceDescriptor.Transient<IConfigureOptions<AuthenticationOptions>,OpenIdConfiguration>(),
                ServiceDescriptor.Transient<IConfigureOptions<OpenIddictServerOptions>, OpenIdConfiguration>(),
                ServiceDescriptor.Transient<IConfigureOptions<JwtBearerOptions>, OpenIdConfiguration>(),
                ServiceDescriptor.Transient<IConfigureOptions<OAuthValidationOptions>, OpenIdConfiguration>(),

                ServiceDescriptor.Transient<IPostConfigureOptions<JwtBearerOptions>, JwtBearerPostConfigureOptions>(),
                ServiceDescriptor.Transient<IPostConfigureOptions<OAuthValidationOptions>, OAuthValidationInitializer>(),
                //ServiceDescriptor.Transient<IPostConfigureOptions<OpenIddictServerOptions>,>(),
                ServiceDescriptor.Transient<IPostConfigureOptions<OpenIddictServerOptions>, OpenIdConnectServerInitializer>()
            });
        }
    }
}
